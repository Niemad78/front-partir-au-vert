import Image from "next/image";

export default function Home() {
  return (
    <section className="h-[100vh] w-[100vw]">
      <div className="flex h-[100%] flex-col items-center justify-center">
        <Image
          src="/images/logo-1.jpg"
          alt="Partir au Vert revient bientôt"
          width={350}
          height={50}
          priority
        />
        <p>Partir au Vert</p>
        <p>Revient bientôt dans une nouvelle version</p>
      </div>
    </section>
  );
}
