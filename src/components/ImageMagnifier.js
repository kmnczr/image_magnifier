import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 50,
  magnifieWidth = 50,
  zoomLevel = 2,
  rValue,
  gValue,
  bValue
}) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const magnifierDistance = 50; // Set the distance from the cursor

  const magnifierAnimation = useSpring({
    top: showMagnifier ? `${y - magnifierHeight / 2 + magnifierDistance}px` : `${y - magnifierHeight / 2 - magnifierDistance}px`,
    left: showMagnifier ? `${x - magnifieWidth / 2}px` : `${x - magnifieWidth / 2}px`,
    config: { tension: 120, friction: 14 }
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
          ...magnifierAnimation, // animated styles here
          borderRadius: "50%",
          opacity: "1",
          border: "1px solid lightgray",
          backgroundImage: `url('${process.env.PUBLIC_URL}/${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          backgroundBlendMode: "multiply",
          backgroundColor: `rgb(${rValue}%, ${gValue}%, ${bValue}%)`,
        }}
      ></animated.div>
    </div>
  );
}

export default ImageMagnifier;

