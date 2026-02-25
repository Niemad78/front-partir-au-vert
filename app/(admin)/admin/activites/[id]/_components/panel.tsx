import { TabView, TabPanel } from "primereact/tabview";
import { Activite } from "@/lib/api/resources/activite/type";
import { Theme } from "@/lib/api/resources/theme/type";
import Form from "./form";
import PointFort from "./point-fort";
import ActiviteImages from "./images";
import PointGps from "./point-gps";

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
      <TabPanel header="Points GPS">
        <PointGps activite={activite} />
      </TabPanel>
      <TabPanel header="Images">
        <ActiviteImages activite={activite} />
      </TabPanel>
    </TabView>
  );
}
