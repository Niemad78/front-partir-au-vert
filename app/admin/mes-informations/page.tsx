import MesInformationsForm from "./_components/form";

export default function Page() {
  return (
    <section>
      <h1 className="text-primary">Mes informations</h1>
      <div className="mt-[100px] flex w-full flex-col items-center justify-center gap-y-[30px]">
        <p>Modifiez vos informations personnelles</p>
        <MesInformationsForm />
      </div>
    </section>
  );
}
