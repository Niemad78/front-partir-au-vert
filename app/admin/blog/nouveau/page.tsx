import { getUsers } from "@/lib/api/resources/user";
import Form from "./_components/form";
import Breadcrumb from "@/components/breadcrumb";
import { cookies } from "next/headers";

export default async function Nouveau() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const auteurs = await getUsers(token ?? "");
  const breadcrumbItems = [
    { label: "Articles", href: "/admin/blog" },
    { label: "Nouvel article" },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Créer un nouvel article</h1>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mt-[20px] flex w-full justify-center">
        {auteurs.ok ? (
          <Form auteurs={auteurs.data} />
        ) : (
          <p>Veuillez créer un auteur avant d&#39;ajouter un article.</p>
        )}
      </div>
    </section>
  );
}
