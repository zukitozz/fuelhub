'use client';
import useSWR from 'swr';
import { aproveBilling, listBilling } from "@/actions";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { Constants } from '@/constants/Constants';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from 'react';
import moment, { Moment } from 'moment';
import { ApproveGuiaRequest } from '@/interfaces';

export default function AproovePage() {
    const fetcher = (url: string) => listBilling(url, fechaEmision);
    const { data, error } = useSWR(`${Constants.API_URL}/billing`, fetcher);
    const [ fechaEmision, setFechaEmision] = useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const historic = data?.historic || [];
    const handleSubmitFormData = async (id: string, precio: number, cantidad: number) => {
        setIsLoading(true);
        try {
            const payload: ApproveGuiaRequest = {
                id,
                igv: 0,
                igv_unitario: 0,
                precio,
                precio_unitario: 0,
                valor: 0,
                valor_unitario: 0,
                pago_efectivo: 0,
                pago_tarjeta: 0,
                pago_yape: 0,
                total_gravadas: 0,
                total_igv: 0,
                total_venta: 0
            };
             const respBilling = await aproveBilling(payload);
             console.log(respBilling);
                if (respBilling.result) {
                    alert('Comprobante actualizado correctamente');
                } else {
                    // Handle error response
                    alert(respBilling.message || 'Error al actualizar el comprobante');
                }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <>
            <div className="mb-10">
                <Datetime
                    className="appearance-none"
                    value={fechaEmision??new Date()}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    onChange={(value: string | Moment) => {
                        if (typeof value === 'string') {
                            setFechaEmision(moment(value, "YYYY-MM-DD").toDate());
                        } else if (moment.isMoment(value)) {
                            setFechaEmision(value.toDate());
                        } else {
                            setFechaEmision(null);
                        }
                    }}
                />
            </div>
            <div className="mb-10">
                <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Fecha
                    </th>   
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Servicio
                    </th>                        
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Cliente
                    </th>                
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Precio
                    </th>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Acciones
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {historic.filter((item: any) => (item.tipo_comprobante === '01')).map((item : any) => (
                    <tr
                        key={item.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" 
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.fecha_actual}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.items[0]?.descripcion}
                        </td>                    
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.receptor?.razon_social}
                        </td>                                   
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input 
                        type="number"
                        name="precio_unitario" 
                        defaultValue={ item.items[0]?.precio_unitario }
                        disabled={ item.etapa !== 'CREATED' }
                        className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
                        />                             
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <button
                            className='bg-blue-400 px-4 py-2 rounded-xl'
                            disabled={isLoading || item.etapa !== 'CREATED' }
                            onClick={() => handleSubmitFormData(item.id, item.items[0]?.precio_unitario, item.items[0]?.cantidad)}
                            >
                            Actualizar
                            </button>
                        </td>
                    </tr>
                    ))}   
                </tbody>
                </table>            
            </div>            
        </>

    )
}