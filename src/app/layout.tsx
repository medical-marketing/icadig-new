import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import clsx from "clsx";

import { Nunito, Nunito_Sans, Roboto, Baskervville } from "next/font/google";

import { createClient, repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";

import { Providers } from "@/app/providers";
import { TrackingHeadScript } from "@phntms/next-gtm";

const body = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const display = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const roboto = Roboto({
  display: "swap",
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "300",
});

const baskervville = Baskervville({
  weight: "400",
  display: "swap",
  variable: "--font-baskervville",
  subsets: ["latin"],
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  const {
    data: {
      meta_title,
      meta_description,
      og_image,
      block_indexing_by_search_engines,
    },
  } = settings;

  return {
    title: meta_title || "Fallback Meta Title",
    description: meta_description || "Fallback description",
    openGraph: {
      images: [og_image?.url || "./fallback_image_path"],
    },
    robots: { index: block_indexing_by_search_engines == false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const {
    data: {
      primary_color,
      secondary_color,
      gtm_id: GTM_ID,
      block_indexing_by_search_engines,
    },
  } = settings;
  console.log("block indexing", block_indexing_by_search_engines);
  return (
    <html lang="en">
      <body
        className={clsx(
          body.variable,
          display.variable,
          roboto.variable,
          baskervville.variable
        )}
      >
        <Providers>
          <TrackingHeadScript id={GTM_ID || ""} isGTM={true} />
          {children}
          <SpeedInsights />
        </Providers>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
