import { IConductor, IOrigen, IVehiculo } from "@/interfaces";

interface StepAProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  origenes: IOrigen[];
  conductores: IConductor[];
  vehiculos: IVehiculo[];
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: () => void;
}
const StepA: React.FC<StepAProps> = ({ formData, handleChangeInput, handleNextStep, origenes, conductores, vehiculos }) => {
  return (
    <div>
      <h1 className='my-10 text-xl font-bold text-blue-900'>
        Seleccione: Información del origen, conductor y vehiculo
      </h1>
      <div className='my-2'>
        <label htmlFor="origen" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Punto de origen</label>
        <select id="origen" className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option defaultValue={''}>Seleccione</option>
            {origenes.map((field) => (
                <option key={ field.id } value={ field.ubigeo }>{ field.nombre }</option>
            ))}
        </select>
      </div>
      <div className='my-2'>
        <label htmlFor="origen" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Conductor</label>
        <select id="origen" className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option defaultValue={''}>Seleccione</option>
            {conductores.map((field) => (
                <option key={ field.numero_documento } value={ field.numero_documento }>{ field.nombres }</option>
            ))}
        </select>
      </div>
      <div className='my-2'>
        <label htmlFor="origen" className="block mb-2 text-lg font-large text-gray-900 dark:text-white">Vehiculo</label>
        <select id="origen" className={`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
            <option defaultValue={''}>Seleccione</option>
            {vehiculos.map((field) => (
                <option key={ field.placa } value={ field.placa }>{ field.placa }</option>
            ))}
        </select>
      </div>      
      <div className='my-2 flex justify-end items-center'>
        <button
          className='bg-green-400 px-4 py-2 rounded-xl font-large'
          onClick={handleNextStep}
        >
          SIGUIENTE
        </button>
      </div>
    </div>
  );
};

export default StepA;
