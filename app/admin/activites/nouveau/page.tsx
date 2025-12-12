import { getThemes } from "@/lib/api/resources/theme";
import Form from "./_components/form";

export default async function Nouveau() {
  const themes = await getThemes();

  return (
    <section>
      <h1 className="text-primary mb-[50px]">Créer une nouvelle activité</h1>
      <div className="flex w-full justify-center">
        {themes.ok ? (
          <Form themes={themes.data} />
        ) : (
          <p>Veuillez créer un thème avant d&#39;ajouter une activité.</p>
        )}
      </div>
    </section>
  );
}
