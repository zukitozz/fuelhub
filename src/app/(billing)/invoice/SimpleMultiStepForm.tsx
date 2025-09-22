'use client';
import React, { useEffect, useState } from 'react';
import StepA from './StepA';
import StepB from './StepB';
import StepC from './StepC';
import StepD from './StepD';
import StepFinal from './StepFinal';
import { SeedData } from '@/seed/seed';

const initialFormData = {
    firstName: '',
    lastName: '',
    businessName: '',
    businessCity: '',
    businessWebsite: '',
    businessEmail: '',
    incomePerMonth: 0,
    taxPercantage: 0,
    agreeToTerms: false,
    cantidad_diesel: 0,
    precio_diesel: 0,
    cantidad_regular: 0,
    precio_regular: 0,
    cantidad_premium: 0,
    precio_premium: 0,
};

const stepsArray = ['A', 'B', 'C', 'D'];

interface SimpleMultiStepFormProps {
  initialData: SeedData;
}

const SimpleMultiStepForm: React.FC<SimpleMultiStepFormProps> = ({ initialData }) => {
  const [step, setStep] = useState('A');
  const [formData, setFormData] = useState(initialFormData);
  const { origenes, conductores, vehiculos } = initialData;

  // We need a method to go to next step
  const handleNextStep = () => {
    if (step === 'A') setStep('B');
    else if (step === 'B') setStep('C');
    else if (step === 'C') setStep('D');
  };

  // We need a method to go to prev step
  const handlePrevStep = () => {
    if (step === 'D') setStep('C');
    else if (step === 'C') setStep('B');
    else if (step === 'B') setStep('A');
  };

  // We need a method to update our formData
  const handleChangeInput = (event: { target: { name: any; checked: any; value: any; }; }) => {
    const fieldName = event.target.name;
    let fieldValue;
    if (fieldName === 'agreeToTerms') {
      fieldValue = event.target.checked;
    } else {
      fieldValue = event.target.value;
    }
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  // We need a method to do final operation
  const handleSubmitFormData = () => {
    // Here You can do final Validation and then Submit Your form
    if (!formData.agreeToTerms) {
      alert('Error!!!!!!   You must agree to Terms of Services!!!!');
    } else {
      setStep('Final');
    }
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
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'C' ? (
        <StepC
          formData={formData}
          handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === 'D' ? (
        <StepD
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
