import { listBilling } from "@/actions";
import { Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function HistoricPage() {
    console.log("Loading historic page...");
    const { result, historic = [] } = await listBilling();
    
    if (!result) {
        redirect("/");
    }
    console.log("Historic data:", historic);
    return (
        <>
        <Title title="Historico" />

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
                    Acciones
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
                    {item.respuesta_mifact.errors === '' ? (
                        <>
                        <IoCardOutline className="text-green-800" />
                        <span className="mx-2 text-green-800">Aceptado</span>
                        </>
                    ) : (
                        <>
                        <IoCardOutline className="text-red-800" />
                        <span className="mx-2 text-red-800">Rechazado</span>
                        </>
                    )}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 ">
                    <Link href={`/orders/${ item.serie }`} className="hover:underline">
                        Ver orden
                    </Link>
                    </td>
                </tr>
                ))}

                
            </tbody>
            </table>
        </div>
        </>
    );
}