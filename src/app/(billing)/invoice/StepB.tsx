import { IBillingForm, IBillingFormDetail, IDestinatario, IRemitente } from "@/interfaces";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface StepBProps {
  formData: IBillingForm;
  remitentes: IRemitente[];
  destinatarios: IDestinatario[];
  handleAddDetail: (detail: IBillingFormDetail) => void;
  handlePrevStep: () => void;
  handlePreviewFormData: () => void;
}

const detailFormData: IBillingFormDetail = {
  ruc_remitente: "",
  ruc_destinatario: "",
  gal_diesel: 0,
  gal_regular: 0,
  gal_premium: 0,
  gal_precio: 0
};

const StepB: React.FC<StepBProps> = ({
  formData,
  remitentes,
  destinatarios,
  handleAddDetail,
  handlePrevStep,
  handlePreviewFormData,
}) => {

  const [formDetailData, setFormDetailData] = useState(detailFormData);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormDetailData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      <h1 className='my-2 text-xl font-bold text-blue-900'>
        Ingrese: Información del envío y precios
      </h1>
      <div className='my-2'>
        <label htmlFor="ruc_remitente" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Remitente</label>
        <select 
          name="ruc_remitente"
          onChange={handleChangeInput} 
          defaultValue={ '' }
          className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option value={''}>Seleccione</option>
            {remitentes.map((field) => (
                <option key={ field.numero_documento } value={ field.numero_documento }>{ field.razon_social }</option>
            ))}
        </select>       
      </div>
      <div className='my-2'>
        <label htmlFor="ruc_destinatario" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Destinatario</label>
        <select 
          name="ruc_destinatario"
          onChange={handleChangeInput} 
          defaultValue={ '' }
          className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option value={''}>Seleccione</option>
            {destinatarios.map((field) => (
                <option key={ field.numero_documento } value={ field.numero_documento }>{ field.razon_social }</option>
            ))}
        </select>       
      </div>      
      <div className='my-2'></div>
      <div className='my-2'>
        <label htmlFor="gal_precio" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Precio por galón</label>
        <input 
          type="text" 
          name="gal_precio" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />     
      </div>      
      <div className='inline-flex items-center space-x-4 my-2'>
        <label htmlFor="gal_diesel" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">DIESEL</label>
        <input 
          type="text" 
          name="gal_diesel" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />     
        <label htmlFor="gal_premium" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">PREMIUM</label>
        <input 
          type="text" 
          name="gal_premium" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />      
        <label htmlFor="gal_regular" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">REGULAR</label>
        <input 
          type="text" 
          name="gal_regular" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />                 
      </div>
      <div className='my-2 flex justify-between items-center'>
        <button
          className='bg-purple-400 px-4 py-2 rounded-xl'
          onClick={() => handleAddDetail({...formDetailData})}
        >
          AGREGAR
        </button>
      </div>
      <div className='my-2'>
        <h2 className='my-10 text-lg font-bold text-blue-900'>
          Detalle de envíos agregados
        </h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-base text-left rtl:text-right text-dark-100 dark:text-blue-100 bg-white-100">
            <thead className="text-base text-black uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3 ">Remitente</th>
                <th scope="col" className="px-6 py-3">Destinatario</th>
                <th scope="col" className="px-6 py-3">Precio</th>
                <th scope="col" className="px-6 py-3">Diesel</th>
                <th scope="col" className="px-6 py-3">Premium</th>
                <th scope="col" className="px-6 py-3">Regular</th>
              </tr>
            </thead>
            <tbody className="text-xs text-black uppercase dark:text-white">
              { formData.detalle_envio.map( ( detail, index ) => (
                <tr key={ detail.ruc_remitente || detail.ruc_destinatario }>
                  <td>{ detail.ruc_remitente }</td>
                  <td>{ detail.ruc_destinatario }</td>
                  <td>S/ { detail.gal_precio }</td>
                  <td>GAL { detail.gal_diesel }</td>
                  <td>GAL { detail.gal_premium }</td>
                  <td>GAL { detail.gal_regular }</td>
                </tr>
              ) ) }
            </tbody>
          </table>
        </div>
      </div>  
      <div className='my-2 flex justify-between items-center'>
        <button
          className='bg-yellow-400 px-4 py-2 rounded-xl'
          onClick={handlePrevStep}
        >
          ANTERIOR
        </button>        
        <button
          className='bg-green-400 px-4 py-2 rounded-xl mb-3'
          onClick={handlePreviewFormData}
        >
          SIGUIENTE
        </button>
      </div>          
    </div>
  );
};

export default StepB;
