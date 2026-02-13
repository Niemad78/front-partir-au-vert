import Breadcrumb from "@/components/breadcrumb";
import { getArticles } from "@/lib/api/resources/blog/blog";
import { ListeArticles } from "./_components/liste";

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <section>
      <h1 className="text-primary mb-[30px]">Blog</h1>
      <Breadcrumb items={[{ label: "Articles" }]} />
      {articles.ok && <ListeArticles articles={articles.data} />}
    </section>
  );
}
