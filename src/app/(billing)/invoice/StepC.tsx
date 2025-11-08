import { IBillingCompleteForm, IBillingCompleteFormDetail } from '@/interfaces';
import { MdDelete } from 'react-icons/md';

interface StepCProps {
  completeFormData: IBillingCompleteForm;
  handlePrevStep: () => void;
  handleSubmitFormData: () => void;
  handleDeleteDetail: (detail: IBillingCompleteFormDetail) => void;
  disabled: boolean;
}

const StepC: React.FC<StepCProps> = ({
  completeFormData,
  handlePrevStep,
  handleSubmitFormData,
  handleDeleteDetail,
  disabled
}) => {
  return (
    <div>
      <h1 className='mt-2 text-xl font-bold text-blue-900'>
        Confirmar: Revise la información registrada
      </h1>

      <DataConfirmRow label='ORIGEN:' value={completeFormData.origen.nombre} />
      <DataConfirmRow label='CONDUCTOR:' value={completeFormData.conductor.nombres} />
      <DataConfirmRow label='VEHICULO:' value={completeFormData.vehiculo.placa} />

          <div className='my-2 space-x-12'>
            <table className="w-full text-lg text-center rtl:text-right text-dark-100 dark:text-blue-100 bg-white-100 border border-gray-300 rounded-lg border-separate">
              <thead className="text-lg text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3" rowSpan={3}>Remitente</th>
                  <th scope="col" className="px-4 py-3" rowSpan={3}>Destinatario</th>
                  <th scope="col" className="px-1 py-3">Producto</th>
                  <th scope="col" className="px-1 py-3">Cantidad</th>
                  <th scope="col" className="px-1 py-3">Scop</th>
                </tr>
              </thead>      
        { completeFormData.detalle_items.map( ( detail, index ) => (
              <tbody key={index} className="text-sm text-black dark:text-white border-4 border-gray-300">
                  <tr>
                    <td className='text-center' rowSpan={0}>{ detail.remitente.razon_social }</td>
                    <td className='text-center' rowSpan={0}>{ detail.destinatario.razon_social }</td>
                    <td className='text-right'>DIESEL</td>
                    <td className='text-right'>{ detail.gal_diesel }</td>
                    <td className='text-right'>{ detail.scop_diesel }</td>                
                  </tr>
                  <tr>
                    <td className='text-right'>PREMIUM</td>
                    <td className='text-right'>{ detail.gal_premium }</td>
                    <td className='text-right'>{ detail.scop_premium }</td>              
                  </tr>
                  <tr>
                    <td className='text-right'>REGULAR</td>            
                    <td className='text-right'>{ detail.gal_regular }</td>
                    <td className='text-right'>{ detail.scop_regular }</td>                
                  </tr>                                      
              </tbody>

          ) ) }
            </table>
          </div>      

      <div className='my-2 flex justify-between items-center'>
        <button
          className='bg-yellow-400 px-4 py-2 rounded-xl'
          onClick={handlePrevStep}
        >
          Anterior
        </button>
        <button
          className='bg-blue-400 px-4 py-2 rounded-xl'
          disabled={disabled}
          onClick={handleSubmitFormData}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default StepC;

interface DataConfirmRowProps {
  label: string;
  value: string | number;
}

const DataConfirmRow: React.FC<DataConfirmRowProps> = ({ label, value }) => {
  return (
    <div className='my-3 text-lg border border-dashed border-gray-200 p-1 rounded-lg'>
      <span className='mr-4 text-slate-500'>{label}</span>
      <span className='mr-4 text-slate-900'>{value}</span>
    </div>
  );
};
