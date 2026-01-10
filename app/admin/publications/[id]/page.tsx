import { getPublicationById } from "@/lib/api/resources/publication";
import Form from "./_components/form";
import Breadcrumb from "@/components/breadcrumb";
import PublicationImages from "./_components/images";

export default async function Modifier({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const publication = await getPublicationById(id);

  if (!publication.ok) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier une publication</h1>
        <div className="flex w-full justify-center">
          <p>Publication introuvable</p>
        </div>
      </section>
    );
  }

  const breadcrumbItems = [
    { label: "Publications", href: "/admin/publications" },
    { label: "Modifier" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Modifier une publication</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full flex-col items-center gap-y-[20px]">
        <Form publication={publication.data} />
        <PublicationImages publication={publication.data} />
      </div>
    </section>
  );
}
