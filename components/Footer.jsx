
import { FaDiscord, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import MotionOnView from "@/components/MotionOnView";
import config from "@/config";
import "@/css/Footer.css";

export default function Footer() {
  return (
    <div id="footer">
      <MotionOnView className="socials">
        <Link
          href={config.socials.discord}
          target="_blank"
          className="social-link text-[#5865F2]"
          aria-label="Discord"
        >
          <FaDiscord aria-hidden="true" />
        </Link>
        <Link
          href={config.socials.github}
          target="_blank"
          className="social-link text-white"
          aria-label="GitHub"
        >
          <FaGithub aria-hidden="true" />
        </Link>
        <Link
          href={config.socials.twitter}
          target="_blank"
          className="social-link text-white"
          aria-label="X formerly Twitter"
        >
          <FaXTwitter aria-hidden="true" />
        </Link>
        <Link
          href={config.socials.youtube}
          target="_blank"
          className="social-link text-[#FF0000]"
          aria-label="YouTube"
        >
          <FaYoutube aria-hidden="true" />
        </Link>
        <Link
          href={config.socials.linkedIn}
          target="_blank"
          className="social-link text-[#0077B5]"
          aria-label="LinkedIn"
        >
          <FaLinkedin aria-hidden="true" />
        </Link>
      </MotionOnView>
      <footer>
        <div>
          <span>&copy; {new Date().getFullYear()} My Website. All rights reserved.</span>
        </div>
        <div className="links">
          <Link className="link" href="/privacy-policy">Privacy Policy</Link>
          <Link className="link" href="/terms-of-service">Terms of Service</Link>
          <Link className="link" href="/contact">Contact Us</Link>
          <Link className="link" href="/about">About Us</Link>
          <Link className="link" href="/blog">Blog</Link>
          <Link className="link" href="/help">Help Center</Link>
          <Link className="link" href="/support">Support</Link>
          <Link className="link" href="/partners">Partners</Link>
        </div>
      </footer>
    </div>
  );
} 