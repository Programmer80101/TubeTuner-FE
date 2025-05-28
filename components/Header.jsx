"use client";

import { FaHome, FaInfoCircle, FaTools, FaAddressBook, FaUserAlt } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import config from "@/config";
import "@/css/Header.css";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const showNav = !config.navHiddenPaths.includes(pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector(".nav-menu");
      if (!nav.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <FaHome className="nav-icon" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <FaInfoCircle className="nav-icon" />,
    },
    {
      href: "/services",
      label: "Services",
      icon: <FaTools className="nav-icon" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <FaAddressBook className="nav-icon" />,
    },
  ];

  return (
    showNav && (
      <nav id="nav-wrapper">
        <div className="nav">
          <div className="nav-start">
            <Button
              onClick={toggleNav}
              title="Open Navigation"
              aria-label="Open Navigation"
              className="sm:hidden"
              tabIndex={isNavOpen ? -1 : 0}
              color="transparent"
              icon={true}
            >
              <FaBarsStaggered />
            </Button>
          </div>
          <div className="nav-center">
            <Button
              className="brand-name"
              title="Brand Logo: Next.js"
              aria-label="Brand Logo: Next.js"
              color="transparent"
            >
              {config.name}
            </Button>
          </div>
          <div className="nav-end">
            <Button
              title="Profile"
              aria-label="Profile"
              className="rounded-full"
              color="transparent"
              icon={true}
            >
              <FaUserAlt />
            </Button>
          </div>
        </div>
        <div
          className="nav-menu"
          aria-hidden={!isNavOpen}
          data-open={isNavOpen}
        >
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link link" tabIndex={isNavOpen ? 0 : -1}>
              <div className="nav-link-icon">
                {link.icon}
              </div>
              <div className="nav-link-label">
                <span>{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    )
  );
}
