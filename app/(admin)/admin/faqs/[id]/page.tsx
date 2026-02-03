import Form from "./_components/form";
import Breadcrumb from "@/components/breadcrumb";
import { getFaqById } from "@/lib/api/resources/faq";

export default async function Modifier({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq.ok) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier une faq</h1>
        <div className="flex w-full justify-center">
          <p>Faq introuvable</p>
        </div>
      </section>
    );
  }

  const breadcrumbItems = [
    { label: "FAQ", href: "/admin/faqs" },
    { label: "Modifier" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Modifier une faq</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        <Form faq={faq.data} />
      </div>
    </section>
  );
}
