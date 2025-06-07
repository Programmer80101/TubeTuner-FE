import { useState } from 'react';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import "@/css/Widget.css";

export default function Widget({ title, children, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="widget-wrapper">
        <Button
          icon={true}
          onClick={() => setIsOpen(true)}
          title={title}
          aria-label={title}
        >
          {icon}
        </Button>
        <Dialog
          title={title}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {children}
        </Dialog>
      </div>
    </>
  );
}