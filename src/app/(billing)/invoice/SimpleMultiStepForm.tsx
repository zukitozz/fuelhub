'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { listProducts, registerBilling } from "@/actions";
import StepA from './StepA';
import StepB from './StepB';
import StepC from './StepC';
import StepFinal from './StepFinal';
import { SeedData } from '@/seed/seed';
import { IBilling, IBillingCompleteForm, IBillingCompleteFormDetail, IBillingForm, IBillingFormDetail, ICarrier, ICarrierItem, IConductor, IDestinatario, IEnvioGuiaRemision, IOrigen, IReceptor, IRemitente, IRutaResponse, IVehiculo } from '@/interfaces';
import { Constants } from '@/constants';
import { BillingLoading } from '@/components';
import { createUUID } from '@/util';
import { useUIStore } from '@/store';

export const initialFormData: IBillingForm = {
  ubigeo_origen: '',
  placa_vehiculo: '',
  dni_conductor: '',
  detalle_envio: []
};
export const initialCompleteFormData: IBillingCompleteForm = {
  detalle_items: [],
  origen: {
    id: '',
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
  const { showAlert } = useUIStore();
  const [step, setStep] = useState('A');
  const [formData, setFormData] = useState(initialFormData);
  const [completeFormData, setCompleteFormData] = useState(initialCompleteFormData);
  const { origenes, conductores, vehiculos, remitentes, destinatarios } = initialData;
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => {
    if (step === 'A') {
      if(!formData.ubigeo_origen || !formData.placa_vehiculo || !formData.dni_conductor){
          showAlert('Por favor complete todos los campos, no se creó el registro', 'warning');
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
    const { ruc_remitente, gal_diesel, gal_regular, gal_premium } = detail;
    if (ruc_remitente && (gal_diesel > 0 || gal_regular > 0 || gal_premium > 0)) {
      setFormData((prevData) => ({
        ...prevData,
        detalle_envio: [...prevData.detalle_envio, detail],
      }));
    }else{
      showAlert('Debe llenar los campos para añadir un detalle', 'warning');
    }
  };
  const handleSubmitFormData = async () => {
    setIsLoading(true);
    const { historic } = await listProducts(`${Constants.API_URL}/route`, null);
    const routes = historic.items;
    const { detalle_items, origen, vehiculo, conductor } = completeFormData;
    const envio_guias: IEnvioGuiaRemision[] = detalle_items.map((item, index) => {
        const { remitente, gal_diesel, gal_regular, gal_premium, gal_precio, scop_diesel, scop_regular, scop_premium } = item;
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
                descripcion: `DIESEL B5 S50 UV N SCOP ${scop_diesel}`,
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
                descripcion: `GASOHOL REGULAR N SCOP ${scop_regular}`,
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
                descripcion: `GASOHOL PREMIUM N SCOP ${scop_premium}`,
            }
            items.push(item_premium);
        }
        const peso_combustible = +gal_diesel * Constants.PESO_GALON_DIESEL + (+gal_premium + +gal_regular) * Constants.PESO_GALON_GASOHOL;
        const peso_bruto = Constants.PESO_BRUTO_DEFAULT + +peso_combustible;    
        const destinatario = remitente as IDestinatario;
        const precio_referencial = routes.find((ruta) => (ruta.origen.id === origen.id && ruta.destino.numero_documento === destinatario.numero_documento))?.precio || 0;
        const precio_galon = +(gal_precio && gal_precio > 0 ? gal_precio : precio_referencial);
        const transaccion = createUUID();
        const gr_transportista: ICarrier = {
          serie: Constants.SERIE_GUIA_REMISION_TRANSPORTISTA,
          fecha_traslado: new Date().toLocaleString('sv-SE', {timeZone: 'America/Lima' }),
          remitente,
          destinatario,
          conductor,
          vehiculo,
          usuario: Constants.USUARIO_DEFAULT,
          tipo_comprobante: Constants.TIPO_COMPROBANTE.GUIA_REMISION_TRANSPORTISTA,
          detalle: items,
          llegada_direccion: remitente.direccion,
          llegada_ubigeo: remitente.ubigeo,
          partida_identificador: origen.id,
          partida_direccion: origen.direccion,
          partida_ubigeo: origen.ubigeo,
          peso_bruto,
          ruc: Constants.RUC_EMPRESA,
          etapa: Constants.ETAPA_FACTURACION.POR_ENVIAR,
          visibilidad_administrador: 0,
          transaccion
        };
        const cantidad = ((+gal_diesel + +gal_premium + +gal_regular)*1000)/1000;
        const precio_unitario = +((+precio_galon).toFixed(2));
        const valor_unitario = +((precio_unitario / 1.18).toFixed(10));
        const igv_unitario = +((precio_unitario - valor_unitario).toFixed(10));
        const precio = +((cantidad * precio_unitario).toFixed(2));
        const valor = +(cantidad * valor_unitario).toFixed(2);
        const igv = +((cantidad * igv_unitario).toFixed(2));
        const descripcion = `SERVICIO TRANSPORTE COMBUSTIBLE - `;
        const factura : IBilling = {
            serie: Constants.SERIE_FACTURA,
            receptor : remitente as IReceptor,
            usuario: Constants.USUARIO_DEFAULT,
            tipo_comprobante: Constants.TIPO_COMPROBANTE.FACTURA,
            total_gravadas: valor,
            total_igv: igv,
            total_venta: precio,
            pago_yape: 0,
            pago_tarjeta: 0,
            pago_efectivo: precio,
            ruc: Constants.RUC_EMPRESA,
            detalle: [
                { cantidad, valor_unitario, precio_unitario, igv_unitario, valor, precio, igv, descripcion, medida: 'GLL', codigo: 'COD' },
            ],
            tipo_documento_afectado: Constants.TIPO_COMPROBANTE.GUIA_REMISION_TRANSPORTISTA,
            numeracion_documento_afectado: 'EG01-1',
            motivo_documento_afectado: 'GUIA DE REMISION TRANSPORTISTA',
            etapa: Constants.ETAPA_FACTURACION.POR_ENVIAR,
            transaccion,
            visibilidad_administrador: 1
        }
        const gr_remitente: ICarrier = {
          serie: Constants.SERIE_GUIA_REMISION_REMITENTE,
          fecha_traslado: new Date().toLocaleString('sv-SE', {timeZone: 'America/Lima' }),
          remitente,
          destinatario,
          conductor,
          vehiculo,
          usuario: Constants.USUARIO_DEFAULT,
          tipo_comprobante: Constants.TIPO_COMPROBANTE.GUIA_REMISION_REMITENTE,
          detalle: items,
          llegada_direccion: remitente.direccion,
          llegada_ubigeo: remitente.ubigeo,
          partida_identificador: origen.id,
          partida_direccion: origen.direccion,
          partida_ubigeo: origen.ubigeo,
          peso_bruto,
          ruc: remitente.numero_documento,
          etapa: Constants.ETAPA_FACTURACION.POR_ENVIAR,
          transaccion,
          visibilidad_administrador: 0
        }
        return {
          factura,
          gr_remitente,
          gr_transportista
        }
    });
    envio_guias.forEach( async (envio) => {
      const { factura, gr_remitente, gr_transportista } = envio;
      showAlert('Registrando Guia de Remision Remitente', 'info')
      const respCarrier = await registerBilling( gr_remitente );
      if ( !respCarrier.result ) {
          console.log( respCarrier.message );
          showAlert('Error al registrar Guia de Remision Remitente', 'error')
          return;
      }
      showAlert('Registrando Guia de Remision Transportista', 'info')
      const respCarrierTransportista = await registerBilling( gr_transportista );
      if ( !respCarrierTransportista.result ) {
        showAlert('Error al registrar Guia de Remision Transportista', 'error')
          console.log( respCarrierTransportista.message );
          return;
      }      
      showAlert('Registrando Factura', 'info')
      const carrier = respCarrierTransportista.comprobante as ICarrier;
      factura.numeracion_documento_afectado = carrier.numeracion;
      const respBilling = await registerBilling( factura );
      if ( !respBilling.result ) {
          console.log( respBilling.message );
      }
      setIsLoading(false);
      showAlert('Pedidos registrados correctamente', 'success');
      window.location.reload();
    });
  };
  const handlePreviewFormData = async () => {
      const { ubigeo_origen, placa_vehiculo, dni_conductor, detalle_envio } = formData;
      const conductor = conductores.find((con) => con.numero_documento === dni_conductor) as IConductor;
      const vehiculo = vehiculos.find((veh) => veh.placa === placa_vehiculo) as IVehiculo;
      const origen = origenes.find((ori) => ori.ubigeo === ubigeo_origen) as IOrigen;

      const detalle_items = detalle_envio.map((item) => ({
          remitente: remitentes.find((remi) => remi.numero_documento === item.ruc_remitente) as IRemitente,
          destinatario: remitentes.find((remi) => remi.numero_documento === item.ruc_remitente) as IDestinatario,
          gal_diesel: item.gal_diesel,
          gal_regular: item.gal_regular,
          gal_premium: item.gal_premium,
          gal_precio: item.gal_precio,
          scop_diesel: item.scop_diesel,
          scop_regular: item.scop_regular,
          scop_premium: item.scop_premium        
      }));     
      setCompleteFormData({
          origen,
          vehiculo,
          conductor,
          detalle_items
      });
      setStep('C');
  }  
  const handleDeleteDetail = (detail: IBillingCompleteFormDetail) => {
    setFormData((prevData) => ({
      ...prevData,
      detalle_envio: prevData.detalle_envio.filter((d) => (d.ruc_remitente !== detail.remitente.numero_documento)),
    }));
    setCompleteFormData((prevData) => ({
      ...prevData,
      detalle_items: prevData.detalle_items.filter((d) => (d.remitente.numero_documento !== detail.remitente.numero_documento)),
    }));
    showAlert('Detalle eliminado exitosamente', 'success');
  };

  return (
    <>
      {
        isLoading 
        ?<BillingLoading />
        :
        <div className='w-[900px] max-w-full px-12 py-1 mx-auto rounded-lg'>
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
              handleDeleteDetail={handleDeleteDetail}
              disabled={isLoading}
            />
          ) : null}
          {step === 'Final' ? <StepFinal /> : null}
        </div>
      }
    </>
  );
};

export default SimpleMultiStepForm;
