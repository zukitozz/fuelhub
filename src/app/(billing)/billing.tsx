"use client";

import { registerBilling } from "@/actions";
import { SelectFromHideOnSelect } from "@/components";
import { useRouter } from 'next/navigation';
import { IBilling, ICarrier, ICarrierItem, IConductor, IDestinatario, IItem, IOrigen, IReceptor, IRemitente, IVehiculo } from "@/interfaces";
import { Billing } from "@/model";
import clsx from "clsx";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  origenes: IOrigen[];
  vehiculos: IVehiculo[];
  remitentes: IRemitente[];
  destinatarios: IDestinatario[];
  conductores: IConductor[];
}

type FormInputs = {
  ubigeo_origen: string;
  placa_vehiculo: string;
  ruc_remitente: string; 
  ruc_destinatario: string;
  dni_conductor: string;
  gal_diesel: number;
  gal_regular: number;
  gal_premium: number;
  gal_precio: number;
}

export const BillingForm = ({ origenes, vehiculos, remitentes, destinatarios, conductores }: Props) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [origenHidden, setOrigenHidden] = useState(false)
    const [conductorHidden, setConductorHidden] = useState(false)
    const [isPlacingBilling, setIsPlacingBilling] = useState(false)
    const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();
    const router = useRouter();
    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
        // listBilling();
        setIsPlacingBilling(true);
        setErrorMessage('');
        const { dni_conductor, gal_diesel, gal_premium, gal_regular, placa_vehiculo, ruc_destinatario, ruc_remitente, ubigeo_origen } = data;
        const destinatario = destinatarios.find((dest) => dest.numero_documento === ruc_destinatario) as IDestinatario;
        const remitente = remitentes.find((remi) => remi.numero_documento === ruc_remitente) as IRemitente;
        const conductor = conductores.find((con) => con.numero_documento === dni_conductor) as IConductor;
        const vehiculo = vehiculos.find((veh) => veh.placa === placa_vehiculo) as IVehiculo;
        const origen = origenes.find((ori) => ori.ubigeo === ubigeo_origen) as IOrigen;
        const carrier_items = [];
        if(gal_diesel && gal_diesel > 0) {
            const item_diesel_carrier:ICarrierItem = {
                numero: 1,
                cantidad: gal_diesel,
                peso: 0,
                codigo_sunat: "GLI",
                normalizado: 0,
                codigo_partida: "",
                codigo: "GLI",
                medida: "GLI",
                descripcion: "DIESEL B5 S50 UV N SCOP 12517768837",
            }
            carrier_items.push(item_diesel_carrier);
        }
        if(gal_regular && gal_regular > 0) {
            const item_regular_carrier:ICarrierItem = {
                numero: 2,
                cantidad: gal_regular,
                peso: 0,
                codigo_sunat: "GLI",
                normalizado: 0,
                codigo_partida: "",
                codigo: "GLI",
                medida: "GLI",
                descripcion: "GASOHOL REGULAR N SCOP 12517728035",
            }
            carrier_items.push(item_regular_carrier);
        }        
        if(gal_premium && gal_premium > 0) {
            const item_regular_carrier:ICarrierItem = {
                numero: 3,
                cantidad: gal_premium,
                peso: 0,
                codigo_sunat: "GLI",
                normalizado: 0,
                codigo_partida: "",
                codigo: "GLI",
                medida: "GLI",
                descripcion: "GASOHOL PREMIUM N SCOP 12517728035",
            }
            carrier_items.push(item_regular_carrier);
        }

        let carrier: ICarrier = {
            serie: 'TG01',
            remitente,
            destinatario,
            conductor,   
            vehiculo,            
            usuario: 'jcastillo',
            tipo_comprobante: '31',
            llegada_direccion: destinatario.direccion,
            llegada_ubigeo: destinatario.ubigeo,
            partida_direccion: origen.direccion,
            partida_ubigeo: origen.ubigeo,
            peso_bruto: 100,
            ruc: '20100011884',
            items: carrier_items as ICarrierItem[]
        }
        const respCarrier = await registerBilling( carrier );
        if ( !respCarrier.result ) {
            setErrorMessage( respCarrier.message );
            return;
        }
        carrier = respCarrier.comprobante as ICarrier;
        let billing: IBilling = {
            serie: 'F001',
            receptor : destinatario as IReceptor,
            usuario: 'jcastillo',
            tipo_comprobante: '01',
            total_gravadas: 100,
            total_igv: 18,
            total_venta: 118,
            pago_yape: 0,
            pago_tarjeta: 0,
            pago_efectivo: 128.25,
            ruc: '20100011884',
            items: [
                { cantidad: 1, valor_unitario: 100, precio_unitario: 118, igv_unitario: 0.18, valor: 100, precio: 118, igv: 18, descripcion: 'Item 1', medida: 'NIU', codigo: 'COD' },
            ],
            tipo_documento_afectado: '31',
            numeracion_documento_afectado: 'EG01-1',
            motivo_documento_afectado: 'GUIA DE REMISION TRANSPORTISTA'       
        }        
        billing.tipo_documento_afectado = carrier.tipo_comprobante;
        billing.numeracion_documento_afectado = carrier.numeracion;
        billing.motivo_documento_afectado = 'GUIA DE REMISION TRANSPORTISTA';

        const respBilling = await registerBilling( billing );

        if ( !respBilling.result ) {
            setIsPlacingBilling(false);
            setErrorMessage( respBilling.message );
            return;
        }
        //limpiar los valores del formulario
        router.push('/historic'); // Redirigir a la página de inicio

        // window.location.replace('/');
    }

    const fieldOrigen = register("ubigeo_origen", { required: true });
    const fieldConductor = register("dni_conductor", { required: true });
    const fieldVehiculo = register("placa_vehiculo", { required: true });
    const fieldRemitente = register("ruc_remitente", { required: true });
    const fieldDestinatario = register("ruc_destinatario", { required: true });

    return (
      <form onSubmit={ handleSubmit( onSubmit ) }  className="max-w-sm mx-auto">
        <SelectFromHideOnSelect fields={origenes} label="ubigeo_origen" selectLabel="Punto de origen" fieldForm={fieldOrigen}/>
        <SelectFromHideOnSelect fields={conductores} label="dni_conductor" selectLabel="Conductor" fieldForm={fieldConductor}/>
        <SelectFromHideOnSelect fields={vehiculos} label="placa_vehiculo" selectLabel="Vehiculo" fieldForm={fieldVehiculo}/>
        <SelectFromHideOnSelect fields={remitentes} label="ruc_remitente" selectLabel="Remitente" fieldForm={fieldRemitente}/>
        <SelectFromHideOnSelect fields={destinatarios} label="ruc_destinatario" selectLabel="Destinatario" fieldForm={fieldDestinatario}/>

        <div className="grid grid-flow-col gap-3">

        </div>
        <div className="flex flex-col mb-3">
            <span className="block mb-2 text-base font-large text-gray-900 dark:text-white">DIESEL (GAL)</span>
            <input type="text" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" { ...register('gal_diesel', { required: true  }) } />
        </div>        
        <div className="flex flex-col mb-3">
            <span className="block mb-2 text-base font-large text-gray-900 dark:text-white">REGULAR (GAL)</span>
            <input type="text" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" { ...register('gal_regular', { required: true  }) } />
        </div>  
        <div className="flex flex-col mb-3">
            <span className="block mb-2 text-base font-large text-gray-900 dark:text-white">PREMIUM (GAL)</span>
            <input type="text" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" { ...register('gal_premium', { required: true  }) } />
        </div>      
        <div className="flex flex-col mb-10">
            <button 
                className={
                    clsx({
                        'btn-primary w-full': !isPlacingBilling,
                        'btn-disabled w-full': isPlacingBilling
                    })
                }
            >Guardar</button>
        </div>
      </form>        
    );
};