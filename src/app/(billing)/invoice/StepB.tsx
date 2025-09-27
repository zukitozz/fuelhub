import { IBillingForm, IBillingFormDetail, IDestinatario, IRemitente } from "@/interfaces";
import { useState } from "react";

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
  gal_precio: 0,
  scop_diesel: "",
  scop_regular: "",
  scop_premium: ""
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
      <div className='inline-flex items-center space-x-12 my-2'>
        <label htmlFor="gal_diesel" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">GAL DBDIESEL</label>
        <input 
          type="number" 
          step="0.001" 
          name="gal_diesel" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />
        <label htmlFor="scop_diesel" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">SCOPE</label>
        <input 
          type="text" 
          name="scop_diesel" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />        
      </div>
      <div className='inline-flex items-center space-x-12 my-2'>
        <label htmlFor="gal_premium" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">GAL PREMIUM</label>
        <input 
          type="number" 
          step="0.001" 
          name="gal_premium" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />
        <label htmlFor="scop_premium" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">SCOPE</label>
        <input 
          type="text" 
          name="scop_premium" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />            
      </div>
      <div className='inline-flex items-center space-x-12 my-2'>   
        <label htmlFor="gal_regular" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">REGULAR</label>
        <input 
          type="number" 
          step="0.001" 
          name="gal_regular" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />
        <label htmlFor="scop_regular" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">SCOPE</label>
        <input 
          type="text" 
          name="scop_regular" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />                          
      </div>
      <div className='inline-flex items-center space-x-12 my-2 justify-between w-full'>
        <label htmlFor="gal_precio" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">PRECIO</label>
        <input 
          type="number" 
          step="0.1" 
          name="gal_precio" 
          defaultValue={ '' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          /> 
        <button
          className='bg-purple-400 px-4 py-2 rounded-xl w-full'
          onClick={() => {
            handleAddDetail({...formDetailData})
            console.log("limpiando data del detalle");
          }}
        >
          AGREGAR
        </button>          
      </div>
      <div className='my-2'>
        Detalle agregado: { formData.detalle_envio.length }
      </div>
      <div className='my-2'>
        <hr />
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
