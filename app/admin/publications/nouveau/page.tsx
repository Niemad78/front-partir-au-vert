import { getThemes } from "@/lib/api/resources/theme";
import Form from "./_components/form";
import Breadcrumb from "@/components/breadcrumb";

export default async function Nouveau() {
  const themes = await getThemes();

  const breadcrumbItems = [
    { label: "Publications", href: "/admin/publications" },
    { label: "Nouvelle publication" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Créer une nouvelle publication</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        <Form />
      </div>
    </section>
  );
}
