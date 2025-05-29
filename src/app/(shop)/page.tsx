import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import { BillingForm } from './billing';


const {
  origenes,
  vehiculos,
  remitentes,
  destinatarios,
  conductores
} = initialData;



export default function Home() {
  return (
    <>
      <Title
        title="Guias de remisión transportisa"
        subtitle="Complete la información para generar su factura y guía"
        className="mb-2"
      />
      <BillingForm origenes={origenes} vehiculos={vehiculos} remitentes={remitentes} destinatarios={destinatarios} conductores={conductores} />
    </>
  );
}
