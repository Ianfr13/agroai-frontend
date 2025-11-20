import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { EnvironmentDebug } from "@/components/EnvironmentDebug";
import { EnvScript } from "@/components/EnvScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgroAI - Sistema Inteligente para Agricultura",
  description: "Plataforma de inteligência artificial para análise agrícola, monitoramento de plantações e previsões meteorológicas.",
  keywords: "agricultura, inteligência artificial, análise de solo, monitoramento de plantações, previsão do tempo agrícola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <EnvScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <EnvironmentDebug />
        </Providers>
      </body>
    </html>
  );
}
