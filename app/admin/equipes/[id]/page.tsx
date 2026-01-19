import { cookies } from "next/headers";
import Form from "./_components/form";
import { getThemeById } from "@/lib/api/resources/theme";
import Breadcrumb from "@/components/breadcrumb";
import { getEquipeById } from "@/lib/api/resources/equipe";

export default async function Modifier({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const { id } = await params;
  const equipe = await getEquipeById(token || "", id);

  if (!equipe.ok) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier un membre</h1>
        <div className="flex w-full justify-center">
          <p>Membre introuvable</p>
        </div>
      </section>
    );
  }

  const breadcrumbItems = [
    { label: "Équipes", href: "/admin/equipes" },
    { label: "Modifier" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Modifier un membre</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        <Form equipe={equipe.data} />
      </div>
    </section>
  );
}
