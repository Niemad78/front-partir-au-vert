import { TabView, TabPanel } from "primereact/tabview";
import Form from "./form";
import { Utilisateur } from "@/lib/api/resources/user/type";
import ArticleImages from "./images";
import { Article } from "@/lib/api/resources/blog/type";

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
