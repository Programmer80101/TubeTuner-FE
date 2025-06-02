import { LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import Button from "@/components/Button";
import "@/css/LinkButton.css";

export default function LinkButton({
  href,
  external = false,
  icon,
  children,
  className = "",
  ...props
}) {
  return (
    <Link
      tabIndex={-1}
      className={`link-button ${className}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <Button
        className={className}
        {...props}
      >
        {children}
        {!!icon ? icon : (external && (<LuExternalLink />))}
      </Button>
    </Link>
  );
}
