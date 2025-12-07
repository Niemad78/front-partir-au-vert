import { cn } from "@/lib/utils/cn";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <table className={className}>{children}</table>;
}

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

export function Rows({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Row({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

export function Cell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "border-primary border-collapse border px-[20px] py-[10px]",
        className,
      )}
    >
      {children}
    </th>
  );
}
