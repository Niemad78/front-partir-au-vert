import Breadcrumb from "@/components/breadcrumb";
import { ListeActivites } from "./_components/liste";
import { getActivites } from "@/lib/api/resources/activite/activite";

export default async function ThemesPage() {
  const activites = await getActivites();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Activités</h1>
      <Breadcrumb items={[{ label: "Activités" }]} />
      {activites.ok && <ListeActivites activites={activites.data} />}
    </section>
  );
}
