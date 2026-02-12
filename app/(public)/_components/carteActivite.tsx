import { Bouton } from "@/components/bouton";
import { ImageNext } from "@/components/image";
import { Activite } from "@/lib/api/type";

type CarteActiviteProps = {
  activite: Activite;
};

export default function CarteActivite({ activite }: CarteActiviteProps) {
  if (!activite.images || activite.images.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary flex w-[360px] flex-col items-center rounded-sm">
      <div className="relative mx-[30px] mt-[30px] h-[280px] w-[280px]">
        <ImageNext
          src={activite.images[0].nom}
          alt={activite.nom}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="my-[20px] text-white">{activite.nom}</h3>
      <div className="bg-primary flex w-full items-center justify-center gap-[10px] rounded-b-sm py-[10px]">
        <p className="text-white">
          À partir de{" "}
          <span className="text-amatic text-[30px] font-bold">
            {activite.prix}€
          </span>{" "}
          / personne
        </p>
        <a
          href={`activites/${activite.nom.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <Bouton variant="secondary">Découvrir</Bouton>
        </a>
      </div>
    </div>
  );
}
