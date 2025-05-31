import useEventListener from "@/hooks/useEventListener";

export default function useClickOutside(ref, handler) {
  useEventListener("mousedown", (event) => {
    if (!ref.current || ref.current.contains(event.target)) return;
    handler(event);
  });
}
