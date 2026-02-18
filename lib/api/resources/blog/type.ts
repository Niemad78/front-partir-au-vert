import { BaseResult } from "@/lib/api/type";
import { Utilisateur } from "@/lib/api/resources/user/type";
import { Image } from "@/lib/api/resources/image/type";

export type Article = {
  id: string;
  titre: string;
  contenu: string;
  createdAt: string;
  images: Image[];
  user: Utilisateur;
};

export type ArticleResponse = BaseResult<Article> & {
  article: Article;
};

export type ArticleListeResponse = BaseResult<Article[]> & {
  articles: Article[];
};

export type ModificationArticle = {
  id: string;
  titre: string;
  contenu: string;
  imageIds: string[];
};

export type NouvelleArticle = Omit<ModificationArticle, "id">;

export type ArticleAjoutImage = {
  imageIds: string[];
};
