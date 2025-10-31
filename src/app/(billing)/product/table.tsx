'use client';
import useSWR from 'swr';
import { listBilling } from "@/actions";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { Constants } from '@/constants/Constants';
import { listProducts } from '@/actions/product';
import "react-datetime/css/react-datetime.css";
import { IPagination } from '@/interfaces';
import {  useEffect } from 'react';
import moment from 'moment';

interface ProductTableProps {
    page: IPagination | null;
    listPages: IPagination[];
    handleAddPage: (page: IPagination) => void;
}

const fetcher = (url: string, page: IPagination | null) => listProducts(url, page);

export const ProductTable = ({ page, listPages, handleAddPage }: ProductTableProps) => {

    const { data, error, isValidating, isLoading, mutate } = useSWR(`${Constants.API_URL}/product`, (url) => fetcher(url, page));
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
    const historic = data?.historic?.items || [];
    const paginate = data?.historic?.lastEvaluatedKey || null;
    useEffect(() => {
        if (paginate) {
            const exists = listPages.findIndex(
                (page) =>
                    page.lastValue?.id === paginate.id &&
                    page.lastValue?.fecha_emision === paginate.fecha_emision &&
                    page.lastValue?.fecha_actual === paginate.fecha_actual
            );
            if (exists === -1) {
                handleAddPage({ lastValue: paginate, page: listPages.reduce((max, p) => (p.page > max ? p.page : max), 0) + 1 });
            }
        }
    }, [listPages, paginate, handleAddPage]);
    useEffect(() => {
        mutate();
    }, [page, mutate]);

    if(isLoading || isValidating){
        return (<div className="animate-spin rounded-full h-8 w-8 justify-center border-gray-900 border-b-2 align-middle"></div>);
    }
    return (
        <>
        <div className="mb-10">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Origen
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Destino
                        </th>                
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Precio x galón
                        </th>                
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
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
                        {item.origen.razon_social}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.destino.razon_social}
                        </td>                    
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.precio}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            accion
                        </td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ProductTable;