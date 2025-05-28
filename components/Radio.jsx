
export default function Radio({ id, name, label, value, checked, onChange, disabled = false, ...props }) {
  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
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
