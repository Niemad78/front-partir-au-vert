import Breadcrumb from "@/components/breadcrumb";
import { getContact } from "@/lib/api/resources/contact/contact";
import Form from "./_components/form";

export default async function Page() {
  const contact = await getContact();

  if (!contact.ok || !contact.data) {
    return (
      <section>
        <h1 className="text-primary mb-[30px]">Contact</h1>
        <Breadcrumb items={[{ label: "Contact" }]} />
        <div className="mt-[100px] flex w-full flex-col items-center justify-center gap-y-[30px]">
          <p>Une erreur est survenue : {contact.errorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Contact</h1>
      <Breadcrumb items={[{ label: "Contact" }]} />
      <div className="mt-[50px] flex w-full justify-center">
        <Form contact={contact.data} />
      </div>
    </section>
  );
}
