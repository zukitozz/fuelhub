interface StepBProps {
  formData: {
    businessName: string;
    businessCity: string;
    businessWebsite: string;
    businessEmail: string;
    cantidad_diesel: number;
    precio_diesel: number;
    cantidad_regular: number;
    precio_regular: number;
    cantidad_premium: number;
    precio_premium: number;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const StepB: React.FC<StepBProps> = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div>
      <h1 className='my-10 text-xl font-bold text-blue-900'>
        Ingrese: Cantidad y Precio de los combustibles
      </h1>
      <div className="my-2 grid grid-flow-col">
        <div className="text-lg font-bold content-center">DIESEL DB</div>
        <div>
          <label htmlFor="cantidad_diesel" className="block text-gray-700 font-bold text-lg">Cantidad:</label>
          <input 
            type="text" 
            id="cantidad_diesel" 
            value={formData.cantidad_diesel}
            className="border border-gray-300 p-2 rounded-md flex-grow"
            onChange={(e) => handleChangeInput(e)}
            />
        </div>
        <div>
          <label htmlFor="precio_diesel" className="block text-gray-700 font-bold text-lg">Precio:</label>
          <input 
            type="text" 
            id="precio_diesel" 
            value={formData.precio_diesel}
            className="border border-gray-300 p-2 rounded-md flex-grow"
            onChange={(e) => handleChangeInput(e)}
            />
        </div>
      </div>
      <div className="my-2 grid grid-flow-col">
        <div className="text-xl font-bold content-center">PREMIUM</div>
        <div>
          <label htmlFor="cantidad_premium" className="block text-gray-700 font-bold text-lg">Cantidad:</label>
          <input 
            type="text" 
            id="cantidad_premium" 
            value={formData.cantidad_premium}
            className="border border-gray-300 p-2 rounded-md flex-grow"
            onChange={(e) => handleChangeInput(e)}
            />
        </div>
        <div>
          <label htmlFor="precio_premium" className="block text-gray-700 font-bold text-lg">Precio:</label>
          <input 
            type="text" 
            id="precio_premium" 
            value={formData.precio_premium}
            className="border border-gray-300 p-2 rounded-md flex-grow"
            onChange={(e) => handleChangeInput(e)}
            />
        </div>
      </div>
      <div className="my-2 grid grid-flow-col">
        <div className="text-xl font-bold content-center">REGULAR</div>
        <div>
          <label htmlFor="cantidad_regular" className="block text-gray-700 font-bold text-lg">Cantidad:</label>
          <input 
            type="text" 
            id="cantidad_regular" 
            value={formData.cantidad_regular}
            className="border border-gray-300 p-2 rounded-md flex-grow"
            onChange={(e) => handleChangeInput(e)}
            />
        </div>
        <div>
          <label htmlFor="precio_regular" className="block text-gray-700 font-bold text-lg">Precio:</label>
          <input 
            type="text" 
            id="precio_regular" 
            value={formData.precio_regular}
            className="border border-gray-300 p-2 rounded-md flex-grow"
            onChange={(e) => handleChangeInput(e)}
            />
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
          className='bg-green-400 px-4 py-2 rounded-xl'
          onClick={handleNextStep}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
};

export default StepB;
