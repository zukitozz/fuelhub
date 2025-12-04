'use client';
import { useState } from "react"
import { Alert, Title } from "@/components"
import ModalPage from "./modal"
import { ProductTable } from "./table"
import { IPagination } from "@/interfaces"
import { initialData } from "@/seed/seed"

export default function ProductPage() {
    const [listPages, setListPage] = useState<IPagination[]>([{ lastValue: null, page: 1 }]);
    const [actualPage, setActualPage] = useState<IPagination | null>(null);
    const handleAddPage = (page: IPagination) => {
        setListPage((prevPages) => [...prevPages, page]);
    }
    return(     
        <>   
        <Title
        title="Guias de remisión transportisa"
        subtitle="Modificación de precios por transporte de productos"
        className="mb-1"
        />
        {/* <h1 className='my-2 text-xl font-bold text-blue-900'>
            Seleccione: Información del origen, conductor y vehiculo
        </h1>                            */}
        <div className='w-[900px] max-w-full px-12 py-1 mx-auto rounded-lg'>
            <div className="mb-10">
                <ModalPage initialData={initialData} />
                <ProductTable 
                    page={actualPage}
                    listPages={listPages}
                    handleAddPage={handleAddPage}
                />
            <div className="mt-5 flex w-full justify-center gap-2">
                {
                    listPages.map((pageItem) => (
                        <button 
                            key={pageItem.page}
                            onClick={() => {
                                setActualPage(pageItem);
                            }}
                        >
                            {actualPage?.page === pageItem.page ? <strong>{pageItem.page}</strong> : pageItem.page}
                        </button>
                    ))
                }
            </div>                  
            </div>
        </div>
        </>
    )
}