"use client";

import Button from "@/components/Button";

export default function ToggleButton({ value, setValue, options, ...props }) {
  return (
    <Button
      type="button"
      color="primary"
      onClick={() => setValue(!!value ? 0 : 1)}
      {...props}
    >
      {options[value]}
    </Button>
  )
}