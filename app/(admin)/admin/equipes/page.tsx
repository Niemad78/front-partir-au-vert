import { cookies } from "next/headers";
import { ListeEquipes } from "./_components/liste";
import Breadcrumb from "@/components/breadcrumb";
import { getEquipes } from "@/lib/api/resources/equipe";

export default async function EquipesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const equipes = await getEquipes(token || "");

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Équipes</h1>
      <Breadcrumb items={[{ label: "Équipes" }]} />
      {equipes.ok && <ListeEquipes equipes={equipes.data} />}
    </section>
  );
}
