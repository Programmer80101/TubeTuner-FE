
import { Bricolage_Grotesque } from "next/font/google";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";

import "./page.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div>
      <Hero>
        <h1 className={bricolageGrotesque.className}>TubeTuner</h1>
      </Hero>
      <h2>Info</h2>
      <p>https://www.youtube.com/watch?v=Fu82s5DnhBc</p>
      <FAQ />
    </div>
  );
}