"use client";

import { registerBilling } from "@/actions";
import { IBilling, ICarrier, IConductor, IDestinatario, IOrigen, IRemitente, IVehiculo } from "@/interfaces";
import { Billing } from "@/model";
import { ChangeEvent, SetStateAction, useState } from "react";
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
}

export const BillingForm = ({ origenes, vehiculos, remitentes, destinatarios, conductores }: Props) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [origenValue, setOrigenValue] = useState(false)
    const { register, handleSubmit, formState: {errors} } = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = async(data) => {
        setErrorMessage('');
        const { ubigeo_origen, dni_conductor, placa_vehiculo, ruc_remitente, ruc_destinatario } = data;

        const billing: IBilling = {
            serie: 'F001',
            receptor: {
                tipo_documento: '6',
                numero_documento: '20100011884',
                razon_social: 'Empresa de Prueba S.A.C.',
                direccion: 'calle los girales',
                correo: 'jorge.castillo.pe@gmail.com'            
            },
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
                { cantidad: 1, valor_unitario: 100, precio_unitario: 100, igv_unitario: 18, valor: 100, precio: 100, igv: 18, descripcion: 'Item 1', medida: 'NIU', codigo: 'COD' },
            ],
            tipo_documento_afectado: '31',
            numeracion_documento_afectado: 'EG01-1',
            motivo_documento_afectado: 'GUIA DE REMISION TRANSPORTISTA'
        }

        const carrier: ICarrier = {
            serie: 'EG01',
            remitente: {
                tipo_documento: '6',
                numero_documento: '20608699679',
                razon_social: 'Empresa de Prueba Remitente S.A.C.',
                ubigeo: 'Empresa de Prueba Remitente S.A.C.',
                direccion: 'calle los girales 123',
                correo: 'calle los girales 123',        
            },
            destinatario: {
                tipo_documento: '6',
                numero_documento: '20100011884',
                razon_social: 'Empresa de Pruebaa destinatario S.A.C.'     ,
                ubigeo: 'Empresa de Prueba Remitente S.A.C.',
                direccion: 'calle los girales 123',
                correo: 'calle los girales 123',                   
            },
            conductor: {
                usuario: 'jcastillo',
                tipo_documento: '1',
                numero_documento: '49838746',
                nombres: 'KARINA CHAVEZ',
                licencia: 'KARINA CHAVEZ',
                nro_registro_mtc: 'MTCVH00781'      
            },   
            vehiculo: {
                placa: 'ATY437',
                tuc: 'MTCVH00781'        
            },            
            usuario: 'jcastillo',
            tipo_comprobante: '31',
            llegada_direccion: 'calle los girales 123',
            llegada_ubigeo: '150101',
            partida_direccion: 'calle los girales 123',
            partida_ubigeo: '150101',
            peso_bruto: 100,
            ruc: '20100011884',
            items: [
                { numero: 1, codigo: 'COD1', descripcion: 'test', cantidad: 18, peso: 100, codigo_sunat: '', normalizado: 0, codigo_partida: ''},
            ]
        }

        // Server action
        const resp = await registerBilling( billing, carrier );

        if ( !resp.result ) {
            setErrorMessage( resp.message );
            return;
        }
        window.location.replace('/');
    }
    const handleOrigenChange = (selectedOption: { value: string; }[]) => {
        console.log('Selected option:', selectedOption);
        setOrigenValue(true);
    }

    return (
      <form onSubmit={ handleSubmit( onSubmit ) }  className="max-w-sm mx-auto">
        <div className={`${origenValue ? "opacity-0 absolute overflow-hidden":"opacity-100"} transition-opacity ease-in-out delay-150 duration-300 `}>
            <label htmlFor="origen" className="block mb-2 text-base font-large text-gray-900 dark:text-white">Punto de partida</label>
            <select id="origen" className={`block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} {...register("ubigeo_origen", { required: true, onChange: handleOrigenChange })}>
                {origenes.map((origen) => (
                    <option key={ origen.id } value={ origen.id }>{ origen.nombre }</option>
                ))}
            </select>
        </div>
        <div>
        <label htmlFor="conductor" className="block mb-2 text-base font-large text-gray-900 dark:text-white">Conductor</label>
        <select id="origen" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("dni_conductor", { required: true })}>
            {conductores.map((conductor) => (
                <option key={ conductor.numero_documento } value={ conductor.numero_documento }>{ conductor.nombres }</option>
            ))}
        </select>
        </div>       
        <label htmlFor="origen" className="block mb-2 text-base font-large text-gray-900 dark:text-white">Vehiculo</label>
        <select id="origen" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("placa_vehiculo", { required: true })}>
            {vehiculos.map((vehiculo) => (
                <option key={ vehiculo.placa } value={ vehiculo.placa }>{ vehiculo.placa }</option>
            ))}
        </select>        
        <br />
        <label htmlFor="origen" className="block mb-2 text-base font-large text-gray-900 dark:text-white">Remitente</label>
        <select id="origen" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ruc_remitente", { required: true })}>
            {remitentes.map((remitente) => (
                <option key={ remitente.numero_documento } value={ remitente.numero_documento }>{ remitente.razon_social }</option>
            ))}
        </select>
        <br />
        <label htmlFor="origen" className="block mb-2 text-base font-large text-gray-900 dark:text-white">Destinatario</label>
        <select id="origen" className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("ruc_destinatario", { required: true })}>
            {destinatarios.map((destinatario) => (
                <option key={ destinatario.numero_documento } value={ destinatario.numero_documento }>{ destinatario.razon_social }</option>
            ))}
        </select>
        <br />        
        <button className="btn-primary w-full">Guardar</button>
      </form>        
    );
};