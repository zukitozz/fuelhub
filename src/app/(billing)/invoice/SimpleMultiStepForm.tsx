'use client';
import React, { useEffect, useState } from 'react';
import { registerBilling } from "@/actions";
import StepA from './StepA';
import StepB from './StepB';
import StepC from './StepC';
import StepD from './StepD';
import StepFinal from './StepFinal';
import { SeedData } from '@/seed/seed';
import { IBilling, IBillingCompleteForm, IBillingForm, IBillingFormDetail, ICarrier, ICarrierItem, IConductor, IDestinatario, IEnvioGuiaRemision, IOrigen, IReceptor, IRemitente, IVehiculo } from '@/interfaces';
import { Constants } from '@/constants';

export const initialFormData: IBillingForm = {
  ubigeo_origen: '',
  placa_vehiculo: '',
  dni_conductor: '',
  detalle_envio: []
};
export const initialCompleteFormData: IBillingCompleteForm = {
  detalle_items: [],
  origen: {
    ubigeo: '',
    direccion: '',
    nombre: ''
  },
  vehiculo: {
    placa: '',
    tuc: ''
  },
  conductor: {
    usuario: '',
    tipo_documento: '',
    numero_documento: '',
    nombres: '',
    licencia: '',
    nro_registro_mtc: ''
  }
};
interface SimpleMultiStepFormProps {
  initialData: SeedData;
};
const SimpleMultiStepForm: React.FC<SimpleMultiStepFormProps> = ({ initialData }) => {
  const [step, setStep] = useState('A');
  const [formData, setFormData] = useState(initialFormData);
  const [completeFormData, setCompleteFormData] = useState(initialCompleteFormData);
  const { origenes, conductores, vehiculos, remitentes, destinatarios } = initialData;

  const handleNextStep = () => {
    if (step === 'A') {
      if(!formData.ubigeo_origen || !formData.placa_vehiculo || !formData.dni_conductor){
          alert('Error!!!!!!   You must fill all fields!!!!');
          return;
      }
      setStep('B');
    } else if (step === 'B') {
      setStep('C');
    }
  };
  const handlePrevStep = () => {
    if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    let fieldValue;
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === 'checkbox'
    ) {
      fieldValue = event.target.checked;
    } else {
      fieldValue = event.target.value;
    }
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };
  const handleAddDetail = (detail: IBillingFormDetail) => {
    const { ruc_remitente, ruc_destinatario, gal_diesel, gal_regular, gal_premium, gal_precio } = detail;
    if (ruc_remitente && ruc_destinatario && (gal_diesel > 0 || gal_regular > 0 || gal_premium > 0) && gal_precio > 0) {
      setFormData((prevData) => ({
        ...prevData,
        detalle_envio: [...prevData.detalle_envio, detail],
      }));
    }else{
        alert('Error!!!!!!   You must fill all detail fields!!!!');
        return;
    }
  };
  const handleSubmitFormData = () => {
    const { detalle_items, origen, vehiculo, conductor } = completeFormData;
    const envio_guias: IEnvioGuiaRemision[] = detalle_items.map((item, index) => {
        const { remitente, destinatario, gal_diesel, gal_regular, gal_premium, gal_precio } = item;
        const items: ICarrierItem[] = [];
        let item_number = 1;
        if(gal_diesel && gal_diesel > 0) {
            const item_diesel:ICarrierItem = {
                numero: item_number,
                cantidad: gal_diesel,
                peso: 0,
                codigo_sunat: "GLI",
                normalizado: 0,
                codigo_partida: "",
                codigo: "GLI",
                medida: "GLI",
                descripcion: "DIESEL B5 S50 UV N SCOP 12517768837",
            }
            items.push(item_diesel);
            item_number += 1;
        }
        if(gal_regular && gal_regular > 0) {
            const item_regular:ICarrierItem = {
                numero: item_number,
                cantidad: gal_regular,
                peso: 0,
                codigo_sunat: "GLI",
                normalizado: 0,
                codigo_partida: "",
                codigo: "GLI",
                medida: "GLI",
                descripcion: "GASOHOL REGULAR N SCOP 12517728035",
            }
            items.push(item_regular);
            item_number += 1;
        }        
        if(gal_premium && gal_premium > 0) {
            const item_premium:ICarrierItem = {
                numero: item_number,
                cantidad: gal_premium,
                peso: 0,
                codigo_sunat: "GLI",
                normalizado: 0,
                codigo_partida: "",
                codigo: "GLI",
                medida: "GLI",
                descripcion: "GASOHOL PREMIUM N SCOP 12517728035",
            }
            items.push(item_premium);
            item_number += 1;
        }
        const gr_remitente: ICarrier = {
          serie: Constants.SERIE_GUIA_REMISION_REMITENTE,
          remitente,
          destinatario,
          conductor,
          vehiculo,
          usuario: Constants.USUARIO_DEFAULT,
          tipo_comprobante: Constants.TIPO_COMPROBANTE.GUIA_REMISION,
          items,
          llegada_direccion: destinatario.direccion,
          llegada_ubigeo: destinatario.ubigeo,
          partida_direccion: origen.direccion,
          partida_ubigeo: origen.ubigeo,
          peso_bruto: 100,
          ruc: Constants.RUC_EMPRESA
        };
        const cantidad = gal_diesel + gal_premium + gal_regular;
        const precio_unitario = gal_precio;
        const valor_unitario = +(precio_unitario / 1.18).toFixed(2);
        const igv_unitario = +(precio_unitario - valor_unitario).toFixed(2);
        const precio = +(cantidad * precio_unitario).toFixed(2);
        const valor = +(cantidad * valor_unitario).toFixed(2);
        const igv = +(cantidad * igv_unitario).toFixed(2);
        const factura : IBilling = {
            serie: Constants.SERIE_FACTURA,
            receptor : destinatario as IReceptor,
            usuario: Constants.USUARIO_DEFAULT,
            tipo_comprobante: Constants.TIPO_COMPROBANTE.FACTURA,
            total_gravadas: valor,
            total_igv: igv,
            total_venta: precio,
            pago_yape: 0,
            pago_tarjeta: 0,
            pago_efectivo: precio,
            ruc: Constants.RUC_EMPRESA,
            items: [
                { cantidad, valor_unitario, precio_unitario, igv_unitario, valor, precio, igv, descripcion: 'Item 1', medida: 'NIU', codigo: 'COD' },
            ],
            tipo_documento_afectado: Constants.TIPO_COMPROBANTE.GUIA_REMISION,
            numeracion_documento_afectado: 'EG01-1',
            motivo_documento_afectado: 'GUIA DE REMISION TRANSPORTISTA'                 
        }
        const gr_transportista: ICarrier = {
          remitente,
          destinatario,
          conductor,
          vehiculo,
          usuario: '',
          tipo_comprobante: '',
          llegada_direccion: '',
          llegada_ubigeo: '',
          partida_direccion: '',
          partida_ubigeo: '',
          peso_bruto: 0,
          ruc: ''
        }
        return {
          factura,
          gr_remitente,
          gr_transportista
        }
    });
    envio_guias.forEach( async (envio) => {
      const { factura, gr_remitente, gr_transportista } = envio;
      console.log('Registrando Guia de Remision Remitente...', gr_remitente );
      const respCarrier = await registerBilling( gr_remitente );
      if ( !respCarrier.result ) {
          console.log( respCarrier.message );
          return;
      }
      console.log('Registrando Factura...', factura);
      const carrier = respCarrier.comprobante as ICarrier;
      factura.numeracion_documento_afectado = carrier.numeracion;
      const respBilling = await registerBilling( factura );
      if ( !respBilling.result ) {
          console.log( respBilling.message );
          return;
      }        
    });
    //let carrier = new Carrier('TG01', remitentes);
    // Here You can do final Validation and then Submit Your form
    // if (!formData.agreeToTerms) {
    //   alert('Error!!!!!!   You must agree to Terms of Services!!!!');
    // } else {
 
      //setStep('Final');
    //}
  };
  const handlePreviewFormData = () => {
      const { ubigeo_origen, placa_vehiculo, dni_conductor, detalle_envio } = formData;
      const conductor = conductores.find((con) => con.numero_documento === dni_conductor) as IConductor;
      const vehiculo = vehiculos.find((veh) => veh.placa === placa_vehiculo) as IVehiculo;
      const origen = origenes.find((ori) => ori.ubigeo === ubigeo_origen) as IOrigen;
      const detalle_items = detalle_envio.map((item) => ({
          remitente: remitentes.find((remi) => remi.numero_documento === item.ruc_remitente) as IRemitente,
          destinatario: destinatarios.find((dest) => dest.numero_documento === item.ruc_destinatario) as IDestinatario,
          gal_diesel: item.gal_diesel,
          gal_regular: item.gal_regular,
          gal_premium: item.gal_premium,
          gal_precio: item.gal_precio,           
      }));     
      setCompleteFormData({
          origen,
          vehiculo,
          conductor,
          detalle_items
      });
      setStep('C');
  }  

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg'>
      {/* // Render Steps */}
      {step === 'A' ? (
        <StepA
            origenes={origenes}
            conductores={conductores}
            vehiculos={vehiculos}
            formData={formData}
            handleChangeInput={handleChangeInput}
            handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'B' ? (
        <StepB
          remitentes={remitentes}
          destinatarios={destinatarios}
          formData={formData}
          handleAddDetail={handleAddDetail}
          handlePrevStep={handlePrevStep}
          handlePreviewFormData={handlePreviewFormData}
        />
      ) : null}
      {step === 'C' ? (
        <StepC
          completeFormData={completeFormData}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {step === 'Final' ? <StepFinal /> : null}
    </div>
  );
};

export default SimpleMultiStepForm;
