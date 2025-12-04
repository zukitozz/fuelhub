import { IBillingForm, IBillingFormDetail, IDestinatario, IRemitente } from "@/interfaces";
import { useState } from "react";

interface StepBProps {
  formData: IBillingForm;
  remitentes: IRemitente[];
  handleAddDetail: (detail: IBillingFormDetail) => void;
  handlePrevStep: () => void;
  handlePreviewFormData: () => void;
}

const detailFormData: IBillingFormDetail = {
  ruc_remitente: "",
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

  const handleCleanForm = () => {
    setFormDetailData(detailFormData);
  }
  return (
    <div>
      <h1 className='my-2 text-xl font-bold text-blue-900'>
        Ingrese: Información del envío y precios
      </h1>
      <div className='my-2'>
        <label htmlFor="ruc_remitente" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Grifo destino:</label>
        <select 
          name="ruc_remitente"
          onChange={handleChangeInput} 
          value={ formDetailData.ruc_remitente }
          className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option value={''}>Seleccione</option>
            {remitentes.map((field) => (
                <option key={ field.numero_documento } value={ field.numero_documento }>{ field.razon_social }</option>
            ))}
        </select>       
      </div> 
      <div className='md:inline-flex items-center lg:space-x-12 my-2 justify-between w-full'>
        <label htmlFor="gal_diesel" className="block mb-2 text-lg font-large text-gray-900 dark:text-white bg-[#ceff25]">DBDIESEL</label>
        <input 
          type="number" 
          step="0.001" 
          name="gal_diesel" 
          value={ formDetailData.gal_diesel }
          className="block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleChangeInput(e)}
        />
        <label htmlFor="scop_diesel" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Código SCOP</label>
        <input 
          type="text" 
          name="scop_diesel" 
          value={ formDetailData.scop_diesel }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />        
      </div>
      <div className='md:inline-flex items-center lg:space-x-12 my-2 justify-between w-full'>
        <label htmlFor="gal_premium" className="block mb-2 text-lg font-large text-gray-900 dark:text-white bg-[#4c49ea]">PREMIUM</label>
        <input 
          type="number" 
          step="0.001" 
          name="gal_premium" 
          value={ formDetailData.gal_premium }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />
        <label htmlFor="scop_premium" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Código SCOP</label>
        <input 
          type="text" 
          name="scop_premium" 
          value={ formDetailData.scop_premium }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />            
      </div>
      <div className='md:inline-flex items-center lg:space-x-12 my-2 justify-between w-full'>
        <label htmlFor="gal_regular" className="block mb-2 text-lg font-large text-gray-900 dark:text-white bg-[#3ecd5e]">REGULAR</label>
        <input 
          type="number" 
          step="0.001" 
          name="gal_regular" 
          value={ formDetailData.gal_regular }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />
        <label htmlFor="scop_regular" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Código SCOP</label>
        <input 
          type="text" 
          name="scop_regular" 
          value={ formDetailData.scop_regular }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
        />                          
      </div>
      <div className='items-center lg:space-x-12 my-2 w-full'>
        {/* <label htmlFor="gal_precio" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">PRECIO</label>
        <input 
          type="number" 
          step="0.1" 
          name="gal_precio" 
          defaultValue={ '0' }
          className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
          onChange={(e) => handleChangeInput(e)}
          />  */}
        <button
          className='bg-purple-400 px-4 py-2 rounded-xl w-full'
          onClick={() => {
            handleAddDetail({...formDetailData})
            handleCleanForm();
          }}
        >
          AGREGAR ORDEN
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
          className='bg-blue-400 px-4 py-2 rounded-xl mb-3'
          onClick={handlePreviewFormData}
        >
          SIGUIENTE
        </button>
      </div>          
    </div>
  );
};

export default StepB;
