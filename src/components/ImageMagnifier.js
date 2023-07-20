import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 2,
  
}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const magnifierAnimation = useSpring({
    top: showMagnifier ? `${y + 50}px` : `${y + 50}px`,
    left: showMagnifier ? `${x - magnifieWidth / 2}px` : `${x - magnifieWidth / 2}px`,
    config: { tension: 120, friction: 14 } // Adjust these values for different easing effect
  });

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width
      }}
    >
      <img
        src={src}
        style={{ height: height, width: width }}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setImgWidth(width);
          setImgHeight(height);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.pageXOffset;
          const y = e.pageY - top - window.pageYOffset;
          setX(x);
          setY(y);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        alt={"img"}
      />

      <animated.div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          ...magnifierAnimation, // Apply the animated styles here
          borderRadius: "50%",
          opacity: "1",
          border: "1px solid lightgray",
          backgroundImage: `url('${process.env.PUBLIC_URL}/${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          backgroundBlendMode: "multiply",
          //backgroundColor: `rgb(${rValue}%, ${gValue}%, ${bValue}%)`,
        }}
      ></animated.div>
    </div>
  );
}

export default ImageMagnifier;
