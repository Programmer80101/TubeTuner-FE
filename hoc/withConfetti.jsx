import { useRef, useCallback } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

function withConfetti(WrappedComponent) {
  const ConfettiComponent = (props) => {
    const refInstance = useRef(null);

    const triggerConfetti = useCallback(() => {
      if (!refInstance.current) return;

      refInstance.current({
        particleCount: 200,
        shapes: ["square"],
        spread: 50,
        gravity: 1.4,
        decay: 0.95,
        ticks: 10_000,
        origin: { x: 0.5, y: 1 },
      });
    }, []);

    return (
      <>
        <ReactCanvasConfetti
          onInit={({ confetti }) => {
            refInstance.current = confetti;
          }}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999,
            width: '100%',
            height: '100vh',
            overflow: "hidden",
            top: 0,
            left: 0,
          }}
        />

        <WrappedComponent {...props} triggerConfetti={triggerConfetti} />
      </>
    );
  }

  ConfettiComponent.displayName = `withConfetti(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return ConfettiComponent;
}

export default withConfetti;