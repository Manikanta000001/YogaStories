import React, { useEffect, useRef, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  const requestRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      posRef.current = { x, y };

      setPosition({ x, y });

      setIsVisible(true);

      const target = e.target;

      const interactiveElement =
        target?.closest(
          "a, button, input, textarea, select, [role='button'], .cursor-pointer"
        );

      setIsHovered(!!interactiveElement);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animateCursor = () => {
      /* Ring */
      ringRef.current.x +=
        (posRef.current.x - ringRef.current.x) * 0.22;

      ringRef.current.y +=
        (posRef.current.y - ringRef.current.y) * 0.22;

      setRingPos({
        x: ringRef.current.x,
        y: ringRef.current.y,
      });

      /* Trail */
      trailRef.current.x +=
        (posRef.current.x - trailRef.current.x) * 0.08;

      trailRef.current.y +=
        (posRef.current.y - trailRef.current.y) * 0.08;

      setTrailPos({
        x: trailRef.current.x,
        y: trailRef.current.y,
      });

      requestRef.current =
        requestAnimationFrame(animateCursor);
    };

    requestRef.current =
      requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Glow trail */}
      <div
        className={`custom-cursor-trail ${
          isHovered ? "cursor-hovered" : ""
        } hidden md:block`}
        style={{
          transform: `
            translate3d(${trailPos.x}px, ${trailPos.y}px, 0)
            translate(-50%, -50%)
            scale(${isHovered ? 1.8 : 1})
          `,
        }}
      />

      {/* Ring */}
      <div
        className={`custom-cursor-ring ${
          isHovered ? "cursor-hovered" : ""
        } hidden md:block`}
        style={{
          transform: `
            translate3d(${ringPos.x}px, ${ringPos.y}px, 0)
            translate(-50%, -50%)
            scale(
              ${isClicking ? 0.7 : isHovered ? 1.5 : 1}
            )
          `,
        }}
      />

      {/* Center dot */}
      <div
        className={`custom-cursor-dot ${
          isHovered ? "cursor-hovered" : ""
        } hidden md:block`}
        style={{
          transform: `
            translate3d(${position.x}px, ${position.y}px, 0)
            translate(-50%, -50%)
            scale(
              ${isClicking ? 0.4 : isHovered ? 1.5 : 1}
            )
          `,
        }}
      />
    </>
  );
}

export default CustomCursor;