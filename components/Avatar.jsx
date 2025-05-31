import Image from "next/image";
import "@/css/Avatar.css";

export default function Avatar({
  src,
  alt,
  className = '',
}) {
  return (
    <div
      className={`avatar-wrapper ${className}`}
    >
      <Image
        src={src}
        alt={alt || 'Avatar'}
        width={10_000}
        height={10_000}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
