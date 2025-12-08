import { cookies } from "next/headers";
import { Bouton } from "@/components/bouton";
import { getThemes } from "@/lib/api/resources/theme";
import { ListeThemes } from "./_components/liste";
import Link from "next/link";

export default async function ThemesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const themes = await getThemes(token || "");

  return (
    <section>
      <h1 className="text-primary">Thèmes</h1>
      <Link href="/admin/themes/nouveau">
        <Bouton type="button" variant="tertiary" className="my-[30px]">
          + Ajouter un thème
        </Bouton>
      </Link>
      {themes.ok && themes.data?.length > 0 && (
        <ListeThemes themes={themes.data} />
      )}
    </section>
  );
}
