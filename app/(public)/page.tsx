import { getActivites } from "@/lib/api/resources/activite/activite";
import FiltreDesktop from "./_components/filtreDesktop";
import FiltreMobile from "./_components/filtreMobile";
import CarteActivite from "./_components/carteActivite";
import { getFaq } from "@/lib/api/resources/faq/faq";
import Accordeon from "./_components/accordeon";

export default async function Home() {
  const activiteData = await getActivites();
  const activites = activiteData.data ?? [];
  const faqData = await getFaq();
  const faqs = faqData.data ?? [];

  return (
    <section>
      <div className="background-accueil flex h-[500px] w-full flex-col items-center justify-end p-[50px] text-center">
        <h2 className="text-white">
          Partir en excursion... À moins de 1 heure de Paris !
        </h2>
        <h3 className="text-white">
          Faites le plein de découvertes culturelles et gourmande au cours
          d&#39;une journée exceptionnelle
        </h3>
        <div className="hidden lg:block">
          <FiltreDesktop />
        </div>
        <div className="block lg:hidden">
          <FiltreMobile />
        </div>
      </div>
      <div className="mx-auto my-[50px] flex max-w-[1140px] flex-wrap justify-center gap-[30px]">
        {activites.map((activite) => (
          <CarteActivite key={activite.id} activite={activite} />
        ))}
      </div>
      <div className="mx-auto mb-[50px] flex max-w-[1140px] flex-col items-center">
        <hr className="border-secondary mb-[30px] w-[80%] border-t" />
        <h2 className="text-primary mb-[30px] font-light">
          Foire aux questions
        </h2>
        <Accordeon faqs={faqs} />
      </div>
    </section>
  );
}
