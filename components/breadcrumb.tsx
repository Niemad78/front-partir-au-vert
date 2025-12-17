import { HiHome, HiMiniChevronRight } from "react-icons/hi2";

type BreadcrumbProps = {
  items: { label: string; href?: string }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-primary flex items-center">
        <li className="flex items-center">
          <a href="/admin">
            <HiHome />
          </a>
          <HiMiniChevronRight className="mx-[5px]" />
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <HiMiniChevronRight className="mx-[5px]" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
