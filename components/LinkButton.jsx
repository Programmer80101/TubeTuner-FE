import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import Button from "@/components/Button";
import "@/css/LinkButton.css";

export default function LinkButton({
  href,
  external = false,
  icon,
  children,
  ...props
}) {
  return (
    <Link
      className="link-button"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <Button
        {...props}
      >
        {children}
        {!!icon ? icon : (external && (<LuExternalLink />))}
      </Button>
    </Link>
  );
}
