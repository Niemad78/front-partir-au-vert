import Breadcrumb from "@/components/breadcrumb";
import { getPublications } from "@/lib/api/resources/publication/publication";
import { ListePublications } from "./_components/liste";

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Publications</h1>
      <Breadcrumb items={[{ label: "Publications" }]} />
      {publications.ok && (
        <ListePublications publications={publications.data} />
      )}
    </section>
  );
}
