'use client';
import React, { useEffect, useState } from 'react';
import StepA from './StepA';
import StepB from './StepB';
import StepC from './StepC';
import StepD from './StepD';
import StepFinal from './StepFinal';
import { SeedData } from '@/seed/seed';
import { IBillingForm, IBillingFormDetail } from '@/interfaces';

export const initialFormData: IBillingForm = {
  ubigeo_origen: '',
  placa_vehiculo: '',
  dni_conductor: '',
  detalle_envio: []
};

const stepsArray = ['A', 'B', 'C', 'D'];

interface SimpleMultiStepFormProps {
  initialData: SeedData;
}

const SimpleMultiStepForm: React.FC<SimpleMultiStepFormProps> = ({ initialData }) => {
  const [step, setStep] = useState('A');
  const [formData, setFormData] = useState(initialFormData);
  const { origenes, conductores, vehiculos, remitentes, destinatarios } = initialData;

  // We need a method to go to next step
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
  };

  // We need a method to go to prev step
  const handlePrevStep = () => {
    if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // We need a method to update our formData
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = event.target.name;
    let fieldValue;
    console.log(event.target);
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

  const handleAddDetail = (detail: IBillingFormDetail) => {
    setFormData((prevData) => ({
      ...prevData,
      detalle_envio: [...prevData.detalle_envio, detail],
    }));
  };

  // We need a method to do final operation
  const handleSubmitFormData = () => {
    // Here You can do final Validation and then Submit Your form
    // if (!formData.agreeToTerms) {
    //   alert('Error!!!!!!   You must agree to Terms of Services!!!!');
    // } else {
      setStep('Final');
    //}
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg'>
      {/* // Render Steps */}
      {step === 'A' ? (
        <StepA
            origenes={origenes}
            conductores={conductores}
            vehiculos={vehiculos}
            formData={formData}
            handleChangeInput={handleChangeInput}
            handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'B' ? (
        <StepB
          remitentes={remitentes}
          destinatarios={destinatarios}
          formData={formData}
          handleAddDetail={handleAddDetail}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'C' ? (
        <StepC
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {step === 'Final' ? <StepFinal /> : null}
    </div>
  );
};

export default SimpleMultiStepForm;
