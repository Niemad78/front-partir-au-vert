import { TabView, TabPanel } from "primereact/tabview";
import { Publication } from "@/lib/api/resources/publication/type";
import Form from "./form";
import PublicationImages from "./images";

type Props = {
  publication: Publication;
};

export default function Panel({ publication }: Props) {
  return (
    <TabView>
      <TabPanel header="Informations générales">
        <div className="mt-[20px] flex w-full justify-center">
          <Form publication={publication} />
        </div>
      </TabPanel>
      <TabPanel header="Images">
        <PublicationImages publication={publication} />
      </TabPanel>
    </TabView>
  );
}
