"use client";

import { IOrigen } from "@/interfaces";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
    fields: any[];
    label: "ubigeo_origen" | "placa_vehiculo" | "ruc_remitente" | "ruc_destinatario" | "dni_conductor";
    selectLabel: string;
    fieldForm : UseFormRegisterReturn<"ubigeo_origen" | "placa_vehiculo" | "ruc_remitente" | "ruc_destinatario" | "dni_conductor">;
}

interface SelectField {
    key: string;
    value: string;
    name: string;
}

export const SelectFromHideOnSelect = ( { fields, label, selectLabel, fieldForm }: Props ) => {
    const [fieldLabel, setFieldLabel] = useState('');
    const [fieldHidden, setFieldHidden] = useState(false);
    const selectFields: SelectField[] = fields.map((field) => {
        switch (label) {
        case "ubigeo_origen":
            return {
                key: field.id,
                value: field.ubigeo,
                name: field.nombre
            }
        case "placa_vehiculo":
            return {
                key: field.placa,
                value: field.placa,
                name: field.placa
            }
        case "ruc_remitente":
            return {
                key: field.numero_documento,
                value: field.numero_documento,
                name: field.razon_social
            }
        case "ruc_destinatario":
            return {
                key: field.numero_documento,
                value: field.numero_documento,
                name: field.razon_social
            }
        case "dni_conductor":
            return {
                key: field.numero_documento,
                value: field.numero_documento,
                name: field.nombres
            }                                            
        default:
            return {
                key: field.key,
                value: field.value,
                name: field.name
            }
        }

    });
    const ubigeoOnChange = fieldForm.onChange
    fieldForm.onChange = (e) => {
        const res = ubigeoOnChange(e)
        const value = e.target.value
        setFieldHidden( value !== '' );
        return res;
    }

    return (
        <div className={`${fieldHidden ? "overflow-hidden":"opacity-100"} transition-opacity ease-in-out delay-150 duration-300 mb-3`}>
            <label htmlFor="origen" className="block mb-2 text-base font-large text-gray-900 dark:text-white">{ selectLabel }</label>
            <select id="origen" className={`block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} {...fieldForm}>
                <option defaultValue={''}>Seleccione</option>
                {selectFields.map((field) => (
                    <option key={ field.key } value={ field.value }>{ field.name }</option>
                ))}
            </select>
        </div>
    );
}