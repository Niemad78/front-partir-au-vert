import { getActiviteById } from "@/lib/api/resources/activite";
import { getThemes } from "@/lib/api/resources/theme";
import Panel from "./_components/panel";
import Breadcrumb from "@/components/breadcrumb";
import { getArticleById } from "@/lib/api/resources/blog";
import { cookies } from "next/headers";
import { getUtilisateurs } from "@/lib/api/resources/user";

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const auteurs = await getUtilisateurs(token ?? "");

  if (!article.data) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier un article</h1>
        <div className="flex w-full justify-center">
          <p>Article introuvable</p>
        </div>
      </section>
    );
  }

  if (!auteurs.data) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier un article</h1>
        <div className="flex w-full justify-center">
          <p>Erreur lors du chargement des auteurs</p>
        </div>
      </section>
    );
  }

  const breadcrumbItems = [
    { label: "Articles", href: "/admin/blog" },
    { label: article.data.titre },
  ];

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Modification article</h1>
      <Breadcrumb items={breadcrumbItems} />
      <Panel article={article.data} auteurs={auteurs.data} />
    </section>
  );
}
