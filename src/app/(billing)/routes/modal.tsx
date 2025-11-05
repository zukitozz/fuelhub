'use client';
import Modal from '@/components/ui/modal/GenericModal';
import { registerProduct } from "@/actions";
import { IDestinatario, IOrigen, IProductForm } from '@/interfaces';
import { SeedData } from '@/seed/seed';
import React, { useState } from 'react';
import { set } from 'react-hook-form';
import { Product } from '@/model';

export const initialFormData: IProductForm = {
  id_origen: '',
  ruc_destino: '',
  precio_galon: 0
};

interface DataProps {
  initialData: SeedData;
};

const HomePage: React.FC<DataProps>  = ({ initialData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [formData, setFormData] = useState(initialFormData);
    const { origenes, destinatarios } = initialData;

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
    const handleSubmitFormData = async () => {
        console.log('Submitting form data:', formData);
        setDisabled(true);
        const { id_origen, ruc_destino, precio_galon } = formData;
        const origen = origenes.find((ori) => ori.id === id_origen) as IOrigen;
        const destino = destinatarios.find((dest) => dest.numero_documento === ruc_destino) as IDestinatario;
        const product = new Product(origen, destino, precio_galon);
        const savedProduct = await registerProduct(product);
        if(savedProduct.result){
          alert('Producto registrado correctamente');
          closeModal();
        } else {
          alert('Error al registrar el producto');
        }
    }  

    return (
    <div>
        <button className='bg-purple-400 px-4 py-2 rounded-xl' onClick={openModal}>
          AGREGAR
        </button>   
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Registro nuevo precio destino</h2>
        <div className='max-w-full px-12 py-1 mx-auto rounded-lg'>
            <div className='my-2'>
                <label htmlFor="id_origen" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Punto de origen</label>
                <select 
                name="id_origen"
                onChange={handleChangeInput} 
                defaultValue={ formData.id_origen }
                className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    <option value={''}>Seleccione</option>
                    {origenes.map((field) => (
                        <option key={ field.id } value={ field.id }>{ field.nombre }</option>
                    ))}
                </select>
            </div> 
            <div className='my-2'>
                <label htmlFor="ruc_destino" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Punto de destino</label>
                <select 
                name="ruc_destino"
                onChange={handleChangeInput} 
                defaultValue={ formData.ruc_destino }
                className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
                    <option value={''}>Seleccione</option>
                    {destinatarios.map((field) => (
                        <option key={ field.numero_documento } value={ field.numero_documento }>{ field.razon_social }</option>
                    ))}
                </select>
            </div>
            <div className='my-2'>
                <label htmlFor="precio_galon" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">GAL DBDIESEL</label>
                <input 
                type="number" 
                step="0.001" 
                name="precio_galon" 
                value={ formData.precio_galon }
                className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
                onChange={(e) => handleChangeInput(e)}
                />                
            </div>
            <div className='my-2'>
                <button
                className='bg-blue-400 px-4 py-2 rounded-xl'
                disabled={disabled}
                onClick={handleSubmitFormData}
                >
                Confirmar
                </button>            
            </div>                   
        </div>
        </Modal>
    </div>
    );
};

export default HomePage;