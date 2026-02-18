import Breadcrumb from "@/components/breadcrumb";
import { cookies } from "next/headers";
import { getUtilisateurById } from "@/lib/api/resources/user/user";
import Panel from "./_components/panel";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const utilisateur = await getUtilisateurById({ token: token ?? "" });

  if (!utilisateur.ok || !utilisateur.data) {
    return (
      <section>
        <h1 className="text-primary mb-[30px]">Mes informations</h1>
        <Breadcrumb items={[{ label: "Mes informations" }]} />
        <div className="mt-[100px] flex w-full flex-col items-center justify-center gap-y-[30px]">
          <p>Une erreur est survenue : {utilisateur.errorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Mes informations</h1>
      <Breadcrumb items={[{ label: "Mes informations" }]} />
      <Panel utilisateur={utilisateur.data} />
    </section>
  );
}
