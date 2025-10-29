import { cookies } from "next/headers";
import { Bouton } from "@/components/bouton";
import { getUsers } from "@/lib/api/resources/user";
import { ListeUtilisateurs } from "./_components/liste";

export default async function UtilisateurPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const users = await getUsers(token || "");

  return (
    <section>
      <h1 className="text-primary">Utilisateurs</h1>
      <a href="/admin/utilisateurs/nouveau">
        <Bouton type="button" variant="tertiary" className="my-[30px]">
          + Ajouter un utilisateur
        </Bouton>
      </a>
      {users.ok && <ListeUtilisateurs users={users.data} />}
    </section>
  );
}
