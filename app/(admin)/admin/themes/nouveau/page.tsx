import Breadcrumb from "@/components/breadcrumb";
import Form from "./_components/form";

export default function Nouveau() {
  const breadcrumbItems = [
    { label: "Thèmes", href: "/admin/themes" },
    { label: "Nouveau" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Créer un nouveau thème</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        <Form />
      </div>
    </section>
  );
}
