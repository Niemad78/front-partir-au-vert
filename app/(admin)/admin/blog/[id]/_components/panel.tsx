import { TabView, TabPanel } from "primereact/tabview";
import Form from "./form";
import { Article, Utilisateur } from "@/lib/api/type";
import ArticleImages from "./images";

type Props = {
  article: Article;
  auteurs: Utilisateur[];
};

export default function Panel({ article, auteurs }: Props) {
  return (
    <TabView>
      <TabPanel header="Informations générales">
        <Form article={article} auteurs={auteurs} />
      </TabPanel>
      <TabPanel header="Images">
        <ArticleImages article={article} />
      </TabPanel>
    </TabView>
  );
}
