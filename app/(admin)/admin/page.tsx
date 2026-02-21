import { getImageNonLiees } from "@/lib/api/resources/image/image";
import { cookies } from "next/headers";
import { SuppressionImagesNonLiees } from "./_components/suppression";

export default async function Admin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const imagesNonLiees = await getImageNonLiees({ token: token || "" });

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-primary text-center">Bienvenue !</h1>
      <div className="py-[30px]">
        <h3 className="text-secondary mb-[20px] text-center">
          Gestion des images
        </h3>
        <div className="flex items-center gap-x-[10px]">
          <p>Nombre d&#39;images non liées : {imagesNonLiees.nombre}</p>
          <SuppressionImagesNonLiees />
        </div>
      </div>
    </section>
  );
}
