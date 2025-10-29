import { cn } from "@/lib/utils/cn";

type BoutonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
};

export function Bouton({
  children,
  className,
  onClick,
  type = "submit",
  disabled = false,
  variant = "primary",
}: BoutonProps) {
  const variantClasses = {
    primary:
      "bg-primary text-white font-bold px-[20px] py-[10px] rounded hover:cursor-pointer",
    secondary:
      "bg-tertiary text-primary font-bold px-[20px] py-[10px] rounded hover:cursor-pointer",
    tertiary:
      "bg-transparent text-primary font-bold px-[20px] py-[10px] rounded hover:cursor-pointer border border-primary",
    danger:
      "bg-danger text-white font-bold px-[20px] py-[10px] rounded hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <button
      className={cn(variantClasses[variant], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
