import { NavbarDesktop } from "@/app/(public)/_components/navbarDesktop";
import NavbarMobile from "./_components/navbarMobile";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavbarDesktop />
      <NavbarMobile />
      {children}
    </section>
  );
}
