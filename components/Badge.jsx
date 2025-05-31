import "@/css/Badge.css";

export default function Badge({
  children,
  color = "neutral",
  solid = false,
  className = "",
}) {

  return (
    <span
      className={`badge ${className}`}
      data-color={color}
      data-solid={solid}
    >
      <span className="badge-text">
        {children}
      </span>
    </span>
  );
}