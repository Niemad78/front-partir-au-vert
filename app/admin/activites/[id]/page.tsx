import { getActiviteById } from "@/lib/api/resources/activite";
import { getThemes } from "@/lib/api/resources/theme";
import Panel from "./_components/panel";

export default async function Activite({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activite = await getActiviteById(id);
  const themes = await getThemes();

  if (!activite.data) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier une activité</h1>
        <div className="flex w-full justify-center">
          <p>Activité introuvable</p>
        </div>
      </section>
    );
  }

  if (!themes.data) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier une activité</h1>
        <div className="flex w-full justify-center">
          <p>Erreur lors du chargement des thèmes</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Modification activité</h1>
      <Panel activite={activite.data} themes={themes.data} />
    </section>
  );
}
