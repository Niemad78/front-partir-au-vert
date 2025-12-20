import Breadcrumb from "@/components/breadcrumb";
import Form from "./_components/form";

export default function Nouveau() {
  const breadcrumbItems = [
    { label: "FAQ", href: "/admin/faqs" },
    { label: "Nouveau" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Créer une nouvelle FAQ</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        <Form />
      </div>
    </section>
  );
}
