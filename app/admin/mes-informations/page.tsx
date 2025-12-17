import Breadcrumb from "@/components/breadcrumb";
import MesInformationsForm from "./_components/form";

export default function Page() {
  return (
    <section>
      <h1 className="text-primary mb-[30px]">Mes informations</h1>
      <Breadcrumb items={[{ label: "Mes informations" }]} />
      <div className="mt-[100px] flex w-full flex-col items-center justify-center gap-y-[30px]">
        <p>Modifiez vos informations personnelles</p>
        <MesInformationsForm />
      </div>
    </section>
  );
}
