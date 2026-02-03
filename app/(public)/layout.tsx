import { NavbarDesktop } from "@/app/(public)/_components/navbarDesktop";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavbarDesktop />
      {children}
    </section>
  );
}
