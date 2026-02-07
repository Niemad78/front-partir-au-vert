import { NavbarDesktop } from "@/app/(public)/_components/navbarDesktop";
import NavbarMobile from "./_components/navbarMobile";
import FooterDesktop from "./_components/footerDesktop";

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
      <FooterDesktop />
    </section>
  );
}
