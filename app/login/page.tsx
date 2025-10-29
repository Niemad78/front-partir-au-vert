import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyMe } from "@/lib/api/resources/user";
import LoginForm from "./_components/form";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    const res = await verifyMe(token);

    if (res.ok) {
      redirect("/admin");
    }
  }

  return (
    <section className="flex h-[100vh] w-[100vw] items-center justify-center">
      <div className="bg-primary flex w-[500px] flex-col items-center gap-[20px] rounded-lg p-[30px]">
        <Image
          src="/images/logo-2.png"
          alt="Partir au Vert"
          width={150}
          height={50}
          priority
        />
        <LoginForm />
      </div>
    </section>
  );
}
