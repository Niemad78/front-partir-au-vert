import { getContact } from "@/lib/api/resources/contact";
import { getPublications } from "@/lib/api/resources/publication";
import { TypePublication } from "@/lib/api/type";
import { havePublication } from "@/lib/utils/havePublication";
import Link from "next/link";
import { Divider } from "primereact/divider";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsLinkedin,
  BsTiktok,
} from "react-icons/bs";

export default async function FooterMobile() {
  const resultData = await getPublications();
  const publications = resultData.ok ? resultData.data : [];
  const contactData = await getContact();
  const contact = contactData.ok ? contactData.data : null;

  return (
    <footer className="from-primary block bg-gradient-to-b to-neutral-700 py-[20px] text-center text-white lg:hidden">
      <div className="flex flex-col items-center">
        <div>
          <h3 className="text-tertiary">Informations Pratiques</h3>
          <div className="mt-[10px] flex flex-col gap-y-[5px]">
            {havePublication({
              publications,
              type: TypePublication.mentions_legales,
            }) && (
              <Link href="/mentions_legales" className="mx-[15px]">
                Mentions Légales
              </Link>
            )}
            {havePublication({
              publications,
              type: TypePublication.cgv,
            }) && (
              <Link href="/cgv" className="mx-[15px]">
                Conditions Générales de Vente
              </Link>
            )}
          </div>
        </div>
        <div className="w-[50%]">
          <Divider />
        </div>
        <div>
          <h3 className="text-tertiary">Contact</h3>
          <div className="mt-[10px] flex flex-col gap-y-[5px]">
            <a href={`mailto:${contact?.email}`}>{contact?.email}</a>
            <a href={`tel:${contact?.telephone}`}>{contact?.telephone}</a>
          </div>
        </div>
      </div>
      <div className="my-[30px] flex justify-center gap-[15px]">
        {contact?.facebook && (
          <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
            <BsFacebook className="text-4xl" />
          </a>
        )}
        {contact?.instagram && (
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
            <BsInstagram className="text-4xl" />
          </a>
        )}
        {contact?.twitter && (
          <a href={contact.twitter} target="_blank" rel="noopener noreferrer">
            <BsTwitterX className="text-4xl" />
          </a>
        )}
        {contact?.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            <BsLinkedin className="text-4xl" />
          </a>
        )}
        {contact?.tiktok && (
          <a href={contact.tiktok} target="_blank" rel="noopener noreferrer">
            <BsTiktok className="text-4xl" />
          </a>
        )}
      </div>
      <p>
        &copy; {new Date().getFullYear()} Partir au Vert. Tous droits réservés.
      </p>
    </footer>
  );
}
