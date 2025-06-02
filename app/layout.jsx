import { Outfit } from "next/font/google";
import AnimationWrapper from "@/components/AnimationWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";
import "@/css/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(config.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: config.logo,
  },
  title: {
    template: `${config.abbr} | %s`,
    default: config.name,
  },
  description: config.description,
  category: "technology",
  author: config.author,
  creator: config.author,
  publisher: config.author,
  keywords: config.keywords,
  openGraph: {
    title: {
      template: `${config.name} | %s`,
      default: config.name,
    },
    site_name: config.name,
    description: config.description,
    type: "website",
    locale: "en",
    url: config.url,
    images: [
      {
        url: config.name,
        width: config.logoSize,
        height: config.logoSize,
        alt: `${config.abbr} Logo`,
      },
    ],
  },
  twitter: {
    title: {
      template: `${config.abbr} | %s`,
      default: config.name,
    },
    description: config.description,
    card: "summary_large_image",
    site: config.twitterHandle,
    creator: config.twitterHandle,
    images: [
      {
        url: config.name,
        width: config.logoSize,
        height: config.logoSize,
        alt: `${config.abbr} Landing Page`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`} >
        <Header />
        <AnimationWrapper>
          {children}
        </AnimationWrapper>
        <Footer />
      </body>
    </html>
  );
}
