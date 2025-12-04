'use client';
import { IoAlertCircleOutline, IoCheckboxOutline, IoClose, IoCloseCircleOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { useUIStore } from '@/store';

const bgColorTypes = {
  undefined: 'bg-gray-100',
  info: 'bg-blue-100',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
}

const textColor = {
  undefined: 'text-gray-800',
  info: 'text-blue-800',
  success: 'text-green-800',
  warning: 'text-yellow-800',
  error: 'text-red-800',
}

const iconComponent = {
  undefined: <IoInformationCircleOutline size={20} className='mr-3' />,
  info: <IoInformationCircleOutline size={20} className='mr-3' />,
  success: <IoCheckboxOutline size={20} className='mr-3' />,
  warning: <IoAlertCircleOutline size={20} className='mr-3' />,
  error: <IoCloseCircleOutline size={20} className='mr-3' />,
}

const hover = {
  undefined: 'hover:bg-gray-200',
  info: 'hover:bg-blue-200',
  success: 'hover:bg-green-200',
  warning: 'hover:bg-yellow-200',
  error: 'hover:bg-red-200',
}

export const Alert = () => {
  const { message, type, isVisible, closeAlert } = useUIStore();
  if (!isVisible || !message || !type) return null;

  return (
    <div className={`absolute z-50 bottom-4 right-4 flex ${bgColorTypes[type]} p-4 ${textColor[type]} rounded-lg mb-4 items-center justify-between`} role="alert">
        {iconComponent[type]}
        <div className='text-sm font-medium'>{ message }</div>
        <button onClick={closeAlert} type='button' className={`ml-auto h-8 w-8 ${hover[type]} flex items-center justify-center rounded-lg focus:ring-2`}>
            <IoClose size={20}/>
        </button>
    </div>
  )
}
