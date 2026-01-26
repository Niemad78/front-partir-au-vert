import { TabView, TabPanel } from "primereact/tabview";
import { Activite, Theme, Utilisateur } from "@/lib/api/type";
import Form from "./formEmail";
import FormEmail from "./formEmail";
import FormPassword from "./formPassword";
import FormNomPrenom from "./formNomPrenom";
type Props = {
  utilisateur: Utilisateur;
};

export default function Panel({ utilisateur }: Props) {
  return (
    <TabView>
      <TabPanel header="Email" className="mt-[30px] flex justify-center">
        <FormEmail utilisateur={utilisateur} />
      </TabPanel>
      <TabPanel header="Mot de passe" className="mt-[30px] flex justify-center">
        <FormPassword utilisateur={utilisateur} />
      </TabPanel>
      <TabPanel header="Nom & prénom" className="mt-[30px] flex justify-center">
        <FormNomPrenom utilisateur={utilisateur} />
      </TabPanel>
    </TabView>
  );
}
