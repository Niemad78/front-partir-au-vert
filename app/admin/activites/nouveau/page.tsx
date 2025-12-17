import { getThemes } from "@/lib/api/resources/theme";
import Form from "./_components/form";
import Breadcrumb from "@/components/breadcrumb";

export default async function Nouveau() {
  const themes = await getThemes();

  const breadcrumbItems = [
    { label: "Activités", href: "/admin/activites" },
    { label: "Nouvelle activité" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Créer une nouvelle activité</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        {themes.ok ? (
          <Form themes={themes.data} />
        ) : (
          <p>Veuillez créer un thème avant d&#39;ajouter une activité.</p>
        )}
      </div>
    </section>
  );
}
