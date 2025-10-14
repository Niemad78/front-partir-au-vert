import { Bouton } from "./bouton";

export function AdminMenu() {
  return (
    <nav className="bg-primary absolute top-0 left-0 h-[100vh] w-[300px] text-white">
      <ul className="flex h-full flex-col items-center justify-center space-y-[20px]">
        <li>
          <a href="/admin/mes-informations" className="hover:underline">
            <h3>Mes informations</h3>
          </a>
        </li>
        <li>
          <a href="/admin/utilisateurs" className="hover:underline">
            <h3>Utilisateurs</h3>
          </a>
        </li>
        <li>
          <Bouton type="button" variant="secondary">
            Déconnexion
          </Bouton>
        </li>
      </ul>
    </nav>
  );
}
