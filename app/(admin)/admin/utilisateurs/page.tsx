import { cookies } from "next/headers";
import { getUtilisateurs } from "@/lib/api/resources/user";
import { ListeUtilisateurs } from "./_components/liste";
import Breadcrumb from "@/components/breadcrumb";

export default async function UtilisateurPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const utilisateurs = await getUtilisateurs(token || "");

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Utilisateurs</h1>
      <Breadcrumb items={[{ label: "Utilisateurs" }]} />
      {utilisateurs.ok && (
        <ListeUtilisateurs utilisateurs={utilisateurs.data} />
      )}
    </section>
  );
}
