import Breadcrumb from "@/components/breadcrumb";
import { ListeFaq } from "./_components/liste";
import { getFaq } from "@/lib/api/resources/faq";

export default async function FaqPage() {
  const faq = await getFaq();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">FAQ</h1>
      <Breadcrumb items={[{ label: "FAQ" }]} />
      {faq.ok && <ListeFaq faqs={faq.data} />}
    </section>
  );
}
