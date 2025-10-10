'use client';
import useSWR from 'swr';
import { listBilling } from "@/actions";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { Constants } from '@/constants/Constants';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from 'react';
import moment, { Moment } from 'moment';

export default function HistoricPage() {
    const fetcher = (url: string) => listBilling(url, fechaEmision);
    const { data, error } = useSWR(`${Constants.API_URL}/billing`, fetcher);
    const [ fechaEmision, setFechaEmision] = useState<Date | null>(new Date());
    const downloadPdfFromBase64 = (base64String: string, filename: string) => {
      // Ensure the Base64 string has the correct data URI prefix
      const dataUri = base64String.startsWith("data:application/pdf;base64,")
        ? base64String
        : `data:application/pdf;base64,${base64String}`;

      const link = document.createElement("a");
      link.href = dataUri;
      link.download = filename || "document.pdf"; // Default filename if not provided
      document.body.appendChild(link); // Append to body (can be temporary)
      link.click();
      document.body.removeChild(link); // Clean up the temporary link
    };
    const handleDownload = (myBase64Pdf: string) => {
    downloadPdfFromBase64(myBase64Pdf, "MyReport.pdf");
    };    

    if (error) {
        redirect("/");
    }
    const historic = data?.historic || [];
    return (
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
                    #Numeracion
                </th>
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
                    Destinatario / Receptor
                </th>                
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Estado
                </th>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Respuesta
                </th>
                </tr>
            </thead>
            <tbody>
                {historic.map((item : any) => (
                <tr
                    key={item.id}
                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.numeracion}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.fecha_actual}
                    </td>                    
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {item.destinatario?.razon_social??item.receptor.razon_social}
                    </td>                                   
                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {
                        (item.respuesta_mifact)
                        ?(
                            (item.respuesta_mifact["errors"] === '')
                            ?(
                                <>
                                <IoCardOutline className="text-green-800" />
                                <span className="mx-2 text-green-800">Aceptado</span>
                                </>                                
                            )
                            :(
                                <>
                                <IoCardOutline className="text-red-800" />
                                <span className="mx-2 text-red-800">Rechazado</span>
                                </>                                
                            )
                        )
                        :(<span className="mx-2 text-yellow-800">{item.etapa === 'DISPATCH' ? 'Enviando SUNAT' : 'Creado'}</span>)
                    }

                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 ">
                        {
                            (item.respuesta_mifact) 
                            ? (
                                (item.respuesta_mifact["errors"] === '')
                                ?(
                                    item.tipo_comprobante === '01'
                                    ?<Link href={item.respuesta_mifact["url"]} className="hover:underline" target='_blank'>Ver PDF</Link>
                                    :<button onClick={() => handleDownload(item.respuesta_mifact["pdf_bytes"])}>Descargar PDF</button>
                                    
                                )
                                :(<span className="text-red-800">{item.respuesta_mifact["errors"]}</span>)
                            )
                            : (
                                <span className="mx-2">---</span>
                            )
                        }

                    </td>
                </tr>
                ))}

                
            </tbody>
            </table>
        </div>
        </>
    );
}