import { AdminMenu } from "@/components/adminMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Partir au Vert",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AdminMenu />
        <div className="ml-[300px] px-[20px] py-[30px]">{children}</div>
      </body>
    </html>
  );
}
