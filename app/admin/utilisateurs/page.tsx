import { Bouton } from "@/components/bouton";

export default function NouvelUtilisateurPage() {
  return (
    <section>
      <h1 className="text-primary">Utilisateurs</h1>
      <a href="/admin/utilisateurs/nouveau">
        <Bouton type="button" variant="tertiary" className="my-[30px]">
          + Ajouter un utilisateur
        </Bouton>
      </a>
    </section>
  );
}
