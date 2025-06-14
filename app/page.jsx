import { FaArrowsRotate } from "react-icons/fa6";

import { Bricolage_Grotesque } from "next/font/google";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";

import "./page.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main>
      <Hero>
        <div id="hero">
          <h1 className={bricolageGrotesque.className}>TubeTuner</h1>
          <span className="subtitle">Fast and efficient way to convert YouTube videos!</span>
          <form>
            <Input
              id="basic-converter"
              name="Basic Converter"
              label="Paste a YouTube URL"
              type="text"
              value=""
              placeholder="https://www.youtube.com/watch?v=Fu82s5DnhBc"
              required
            />
            <Button
              type="submit"
              color="gradient"
              label="Convert YouTube Video"
            >
              <FaArrowsRotate /> Convert
            </Button>
          </form>
        </div>
      </Hero>
      <h2>Info</h2>
      <p>https://www.youtube.com/watch?v=Fu82s5DnhBc</p>
      <FAQ />
    </main>
  );
}