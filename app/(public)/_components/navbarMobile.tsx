import Link from "next/link";
import { getPublications } from "@/lib/api/resources/publication";
import Image from "next/image";
import SideMenu from "./sideMenu";

export default async function NavbarMobile() {
  const resultData = await getPublications();
  const publications = resultData.ok ? resultData.data : [];

  return (
    <div className="block lg:hidden">
      <div className="bg-primary relative flex h-[60px] justify-center">
        <div className="absolute top-2 left-0">
          <SideMenu publications={publications} />
        </div>
        <Link href="/">
          <Image
            src="/images/logo-1.jpg"
            alt="Partir au Vert"
            width={60}
            height={60}
            priority
          />
        </Link>
      </div>
    </div>
  );
}
