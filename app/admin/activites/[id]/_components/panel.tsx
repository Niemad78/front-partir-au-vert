import { TabView, TabPanel } from "primereact/tabview";
import { Activite, Theme } from "@/lib/api/type";
import Form from "./form";
import PointFort from "./point-fort";

type Props = {
  activite: Activite;
  themes: Theme[];
};

export default function Panel({ activite, themes }: Props) {
  return (
    <TabView>
      <TabPanel header="Informations générales">
        <Form activite={activite} themes={themes} />
      </TabPanel>
      <TabPanel header="Points forts">
        <PointFort activite={activite} />
      </TabPanel>
      <TabPanel header="Images">
        <Form activite={activite} themes={themes} />
      </TabPanel>
    </TabView>
  );
}
