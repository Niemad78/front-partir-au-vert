import { ListeActivites } from "./_components/liste";
import { getActivites } from "@/lib/api/resources/activite";

export default async function ThemesPage() {
  const activites = await getActivites();

  return (
    <section>
      <h1 className="text-primary">Activités</h1>
      {activites.ok && <ListeActivites activites={activites.data} />}
    </section>
  );
}
