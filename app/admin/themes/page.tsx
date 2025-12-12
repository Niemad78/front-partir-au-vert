import { cookies } from "next/headers";
import { getThemes } from "@/lib/api/resources/theme";
import { ListeThemes } from "./_components/liste";

export default async function ThemesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const themes = await getThemes(token || "");

  return (
    <section>
      <h1 className="text-primary">Thèmes</h1>
      {themes.ok && themes.data?.length > 0 && (
        <ListeThemes themes={themes.data} />
      )}
    </section>
  );
}
