import { ListeEquipes } from "./_components/liste";
import Breadcrumb from "@/components/breadcrumb";
import { getEquipes } from "@/lib/api/resources/equipe/equipe";

export default async function EquipesPage() {
  const equipes = await getEquipes();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Équipes</h1>
      <Breadcrumb items={[{ label: "Équipes" }]} />
      {equipes.ok && <ListeEquipes equipes={equipes.data} />}
    </section>
  );
}
