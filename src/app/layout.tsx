import type { Metadata } from "next";
import { AppointmentsProvider } from "@/components/AppointmentsProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetCare | Cuidado que cabe na sua rotina",
  description: "Agende e acompanhe os cuidados do seu pet com praticidade e carinho.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <AppointmentsProvider>
          <Header />
          {children}
          <Footer />
        </AppointmentsProvider>
      </body>
    </html>
  );
}
