import React, { useEffect, useRef, useState } from "react";

const Card3D = ({ children, className }) => {
  const cardRef = useRef(null);
  const [bounds, setBounds] = useState(null);
  const [rotateStyles, setRotateStyles] = useState({
    transform: "",
    backgroundImage: "",
  });
  const rotateToMouse = (e) => {
    if (!bounds) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    setRotateStyles({
      transform: `
        scale3d(1.07, 1.07, 1.07)
        rotate3d(
          ${center.y / 100},
          ${-center.x / 100},
          0,
          ${Math.log(distance) * 2}deg
        )
      `,
      backgroundImage: `
        radial-gradient(
          circle at
          ${center.x * 2 + bounds.width / 2}px
          ${center.y * 2 + bounds.height / 2}px,
          #ffffff55,
          #0000000f
        )
      `,
    });
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      setBounds(cardRef.current.getBoundingClientRect());
      document.addEventListener("mousemove", rotateToMouse);
    }
  };

  const handleMouseLeave = () => {
    document.removeEventListener("mousemove", rotateToMouse);
    setRotateStyles({
      transform: "",
      backgroundImage: "",
    });
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", rotateToMouse);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glowCard relative transition-transform duration-200 ${className}`}
      style={rotateStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="glowInner absolute inset-0 pointer-events-none"
        style={{ backgroundImage: rotateStyles.backgroundImage }}
      />
    </div>
  );
};

export default Card3D;
