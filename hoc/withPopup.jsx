"use client";

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Popup from "@/components/Popup";

export default function withPopup(WrappedComponent) {
  const PopupComponent = (props) => {
    const [popups, setPopups] = useState([]);

    const addPopup = (content, color) => {
      const id = Date.now();
      setPopups((prev) => [...prev, { id, content, color }]);
    };

    const removePopup = useCallback((id) => {
      setPopups((prev) => prev.filter((popup) => popup.id !== id));
    }, []);

    return (
      <>
        <div className="fixed px-5 top-15 left-1/2 -translate-x-1/2 space-y-2 z-50 wrapper-sm w-full">
          <AnimatePresence>
            {popups.map((popup) => (
              <Popup
                id={popup.id}
                key={popup.id}
                color={popup.color}
                removePopup={removePopup}
              >
                {popup.content}
              </Popup>
            ))}
          </AnimatePresence>
        </div>
        <WrappedComponent {...props} addPopup={addPopup} />
      </>
    );
  };

  PopupComponent.displayName = `WithPopup(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return PopupComponent;
};

