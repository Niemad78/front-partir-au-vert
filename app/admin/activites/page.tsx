import { cookies } from "next/headers";
import { Bouton } from "@/components/bouton";
import { ListeActivites } from "./_components/liste";
import Link from "next/link";
import { getActivites } from "@/lib/api/resources/activite";

export default async function ThemesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const activites = await getActivites(token || "");

  return (
    <section>
      <h1 className="text-primary">Activités</h1>
      <Link href="/admin/activites/nouveau">
        <Bouton type="button" variant="tertiary" className="my-[30px]">
          + Ajouter une activité
        </Bouton>
      </Link>
      {activites.ok && activites.data?.length > 0 && (
        <ListeActivites activites={activites.data} />
      )}
    </section>
  );
}
