import { cookies } from "next/headers";
import { getThemes } from "@/lib/api/resources/theme/theme";
import { ListeThemes } from "./_components/liste";
import Breadcrumb from "@/components/breadcrumb";

export default async function ThemesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const themes = await getThemes();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Thèmes</h1>
      <Breadcrumb items={[{ label: "Thèmes" }]} />
      {themes.ok && <ListeThemes themes={themes.data} />}
    </section>
  );
}
