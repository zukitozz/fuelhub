'use client';
import { useEffect, useState } from "react";
import HistoricTable from "./table";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";
import "react-datetime/css/react-datetime.css";
import { IPagination } from "@/interfaces";
import { list } from "postcss";

export default function Historic() {
    const [fechaEmision, setFechaEmision] = useState<Date | null>(null);
    const [actualPage, setActualPage] = useState<IPagination | null>(null);
    const [listPages, setListPage] = useState<IPagination[]>([{ lastValue: null, page: 1 }]);
    const handleAddPage = (page: IPagination) => {
        setListPage((prevPages) => [...prevPages, page]);
    }
    console.log(listPages)
    return (
        <>
            <div className="mb-10">
            <Datetime
                className="appearance-none"
                value={fechaEmision??new Date()}
                dateFormat="YYYY-MM-DD"
                timeFormat={false} 
                closeOnSelect={true}
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
            <div className='bg-white rounded-lg mx-4 p-4'>
                <HistoricTable 
                    fechaEmision={fechaEmision || new Date()}
                    page={actualPage}
                    listPages={listPages}
                    handleAddPage={handleAddPage}
                />
            </div>
            <div className="mt-5 flex w-full justify-center gap-2">
                {
                    listPages.filter((pageItem) => {
                        const fechaEmisionStr = fechaEmision ? moment(fechaEmision).format("YYYY-MM-DD") : undefined;
                        return (pageItem.lastValue?.fecha_emision === fechaEmisionStr || (pageItem.lastValue === null));
                    }).map((pageItem) => (
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
        </>
    );
}