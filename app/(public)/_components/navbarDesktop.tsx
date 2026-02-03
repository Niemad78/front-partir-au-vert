import { getPublications } from "@/lib/api/resources/publication";
import { TypePublication } from "@/lib/api/type";
import { havePublication } from "@/lib/utils/havePublication";
import Image from "next/image";
import Link from "next/link";
import Popover from "./popover";

export async function NavbarDesktop() {
  const resultData = await getPublications();
  const publications = resultData.ok ? resultData.data : [];

  return (
    <div className="bg-primary flex h-[80px] items-center justify-between px-[100px]">
      <Link href="/">
        <Image
          src="/images/logo-1.jpg"
          alt="Partir au Vert revient bientôt"
          width={60}
          height={60}
          priority
        />
      </Link>
      <nav className="flex h-full items-center font-bold text-white">
        <Popover className="mx-[15px]" publications={publications} />
        {havePublication({ publications, type: TypePublication.seminaire }) && (
          <Link href="/seminaire" className="mx-[15px]">
            Séminaires
          </Link>
        )}
        <div className="bg-secondary flex h-full items-center">
          <Link href="/contact" className="text-primary mx-[15px]">
            Contact
          </Link>
        </div>
        <Link href="/blog" className="ml-[15px]">
          Blog
        </Link>
      </nav>
    </div>
  );
}
