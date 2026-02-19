"use client";

import { Faq } from "@/lib/api/resources/faq/type";
import { Accordion, AccordionTab } from "primereact/accordion";

type AccordeonProps = {
  faqs: Faq[];
};

export default function Accordeon({ faqs }: AccordeonProps) {
  return (
    <Accordion activeIndex={0} className="w-full px-[10px]">
      {faqs.map((faq) => (
        <AccordionTab
          key={faq.id}
          header={faq.question}
          pt={{
            headerAction: { className: "!bg-secondary !text-white" },
          }}
        >
          <p>{faq.reponse}</p>
        </AccordionTab>
      ))}
    </Accordion>
  );
}
