import { cookies } from "next/headers";
import { Bouton } from "@/components/bouton";
import { getThemes } from "@/lib/api/resources/theme";
import { ListeThemes } from "./_components/liste";

export default async function ThemesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const themes = await getThemes(token || "");

  return (
    <section>
      <h1 className="text-primary">Thèmes</h1>
      <a href="/admin/themes/nouveau">
        <Bouton type="button" variant="tertiary" className="my-[30px]">
          + Ajouter un thème
        </Bouton>
      </a>
      {themes.ok && themes.data?.length > 0 && (
        <ListeThemes themes={themes.data} />
      )}
    </section>
  );
}
