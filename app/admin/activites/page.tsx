import { cookies } from "next/headers";
import { ListeActivites } from "./_components/liste";
import { getActivites } from "@/lib/api/resources/activite";

export default async function ThemesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const activites = await getActivites(token || "");

  return (
    <section>
      <h1 className="text-primary">Activités</h1>
      {activites.ok && activites.data?.length > 0 && (
        <ListeActivites activites={activites.data} />
      )}
    </section>
  );
}
