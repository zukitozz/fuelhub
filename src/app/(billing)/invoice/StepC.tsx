import { IBillingCompleteForm } from '@/interfaces';
import { ChangeEvent } from 'react';

interface StepCProps {
  completeFormData: IBillingCompleteForm;
  handlePrevStep: () => void;
  handleSubmitFormData: () => void;
}

const StepC: React.FC<StepCProps> = ({
  completeFormData,
  handlePrevStep,
  handleSubmitFormData,
}) => {
  return (
    <div>
      <h1 className='mt-2 text-xl font-bold text-blue-900'>
        Confirmar: Revise la información registrada
      </h1>

      <DataConfirmRow label='ORIGEN:' value={completeFormData.origen.nombre} />
      <DataConfirmRow label='CONDUCTOR:' value={completeFormData.conductor.nombres} />
      <DataConfirmRow label='VEHICULO:' value={completeFormData.vehiculo.placa} />

      <div className='my-2'>
          <table className="w-full text-lg text-left rtl:text-right text-dark-100 dark:text-blue-100 bg-white-100">
            <thead className="text-lg text-black uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
              <tr>
                <th scope="col" className="px-4 py-3 ">Remitente</th>
                <th scope="col" className="px-4 py-3">Destinatario</th>
                <th scope="col" className="px-1 py-3">Precio</th>
                <th scope="col" className="px-1 py-3">Diesel</th>
                <th scope="col" className="px-1 py-3">Premium</th>
                <th scope="col" className="px-1 py-3">Regular</th>
              </tr>
            </thead>
            <tbody className="text-xs text-black uppercase dark:text-white">
              { completeFormData.detalle_items.map( ( detail, index ) => (
                <tr key={ detail.remitente.razon_social || detail.destinatario.razon_social }>
                  <td>{ detail.remitente.razon_social }</td>
                  <td>{ detail.destinatario.razon_social }</td>
                  <td className='text-right'>S/ { detail.gal_precio }</td>
                  <td className='text-right'>GAL { detail.gal_diesel }</td>
                  <td className='text-right'>GAL { detail.gal_premium }</td>
                  <td className='text-right'>GAL { detail.gal_regular }</td>
                </tr>
              ) ) }
            </tbody>
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
