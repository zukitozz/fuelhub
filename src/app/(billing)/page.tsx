import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import SimpleMultiStepForm from './invoice/SimpleMultiStepForm';

export default function Home() {
  return (
    <>
      <Title
        title="Guias de remisión transportisa"
        subtitle="Emisión de facturas y guías transportista y remitente"
        className="mb-1"
      />
      <SimpleMultiStepForm initialData={initialData} />
    </>
  );
}
