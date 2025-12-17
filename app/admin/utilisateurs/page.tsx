import { cookies } from "next/headers";
import { Bouton } from "@/components/bouton";
import { getUsers } from "@/lib/api/resources/user";
import { ListeUtilisateurs } from "./_components/liste";
import Breadcrumb from "@/components/breadcrumb";

export default async function UtilisateurPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const users = await getUsers(token || "");

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Utilisateurs</h1>
      <Breadcrumb items={[{ label: "Utilisateurs" }]} />
      <a href="/admin/utilisateurs/nouveau">
        <Bouton type="button" variant="tertiary" className="my-[30px]">
          + Ajouter un utilisateur
        </Bouton>
      </a>
      {users.ok && <ListeUtilisateurs users={users.data} />}
    </section>
  );
}
