import Link from "next/link";

export default function NotFound() {
  return (
    <div className="background-campagne flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      <div className="background text-primary max-w-[80%] rounded-md bg-white/80 p-[40px] text-center">
        <h3>404</h3>
        <p>Désolé, la page que vous recherchez est introuvable.</p>
        <Link href="/">Retour à l&#39;accueil</Link>
      </div>
    </div>
  );
}
