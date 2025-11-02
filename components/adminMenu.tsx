import { cookies } from "next/headers";
import { BoutonLogout } from "@/app/admin/_components/boutonLogout";
import { getMyRole } from "@/lib/api/resources/user";

export async function AdminMenu() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const role = await getMyRole(token || "");

  return (
    <nav className="bg-primary fixed top-0 left-0 h-[100vh] w-[300px] text-white">
      <ul className="flex h-full flex-col items-center justify-center space-y-[20px]">
        <li>
          <a href="/admin/mes-informations" className="hover:underline">
            <h3>Mes informations</h3>
          </a>
        </li>
        {role.role === "super_admin" && (
          <li>
            <a href="/admin/utilisateurs" className="hover:underline">
              <h3>Utilisateurs</h3>
            </a>
          </li>
        )}
        <li>
          <BoutonLogout />
        </li>
      </ul>
    </nav>
  );
}
