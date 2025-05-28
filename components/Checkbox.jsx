
export default function Checkbox({ id, label, checked, onChange, disabled = false, ...props }) {
  return (
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
