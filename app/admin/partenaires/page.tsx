import Breadcrumb from "@/components/breadcrumb";
import { ListePartenaire } from "./_components/liste";
import { getPartenaires } from "@/lib/api/resources/partenaire";

export default async function PartenairePage() {
  const partenaires = await getPartenaires();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Partenaires</h1>
      <Breadcrumb items={[{ label: "Partenaires" }]} />
      {partenaires.ok && <ListePartenaire partenaires={partenaires.data} />}
    </section>
  );
}
