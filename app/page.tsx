import Image from "next/image";

export default function Home() {
  return (
    <section className="h-[100vh] w-[100vw]">
      <div className="flex h-[100%] flex-col items-center justify-center">
        <p>Partir au Vert</p>
        <p className="mb-8">Revient bientôt dans une nouvelle version</p>
        <Image
          src="/images/logo-1.jpg"
          alt="Partir au Vert revient bientôt"
          width={350}
          height={50}
          priority
        />
        <p className="mt-8 text-center">
          Vous pouvez toujours nous contacter sur{" "}
          <a href="mailto:contact@partirauvert.com">contact@partirauvert.com</a>
        </p>
      </div>
    </section>
  );
}
