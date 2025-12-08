import { cookies } from "next/headers";
import Form from "./_components/form";
import { getThemeById } from "@/lib/api/resources/theme";

export default async function Modifier({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const { id } = await params;
  const theme = await getThemeById(token || "", id);

  if (!theme.ok) {
    return (
      <section>
        <h1 className="text-primary mb-[50px]">Modifier un thème</h1>
        <div className="flex w-full justify-center">
          <p>Thème introuvable</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-primary mb-[50px]">Modifier un thème</h1>
      <div className="flex w-full justify-center">
        <Form theme={theme.data} />
      </div>
    </section>
  );
}
