import React, { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";

function ImageMagnifier({
  src,
  width,
  height,
  magnifierHeight = 50,
  magnifierWidth = 50,
  zoomLevel = 2,
  rValue,
  gValue,
  bValue,
}) {
  const imgRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const magnifierDistance = 50; // Set the distance from the cursor

  const springConfig = { tension: 120, friction: 14 };

  const getAdjustedPosition = (position, imageSize, magnifierSize) => {
    const halfMagnifierSize = magnifierSize / 2;
    return Math.min(
      Math.max(position, halfMagnifierSize),
      imageSize - halfMagnifierSize
    );
  };

  const magnifierAnimation = useSpring({
    top: showMagnifier
      ? getAdjustedPosition(
          y - magnifierHeight / 2 + magnifierDistance,
          imgHeight,
          magnifierHeight
        )
      : y - magnifierHeight / 2 - magnifierDistance,
    left: showMagnifier
      ? getAdjustedPosition(
          x - magnifierWidth / 2,
          imgWidth,
          magnifierWidth
        )
      : x - magnifierWidth / 2,
    config: springConfig,
  });

  const handleMouseMove = (e) => {
    const elem = imgRef.current;
    const { top, left } = elem.getBoundingClientRect();
    const x = getAdjustedPosition(
      e.pageX - left - window.pageXOffset,
      imgWidth,
      magnifierWidth
    );
    const y = getAdjustedPosition(
      e.pageY - top - window.pageYOffset,
      imgHeight,
      magnifierHeight
    );
    setX(x);
    setY(y);
  };

  const handleMouseEnter = () => {
    const elem = imgRef.current;
    const { width, height } = elem.getBoundingClientRect();
    setImgWidth(width);
    setImgHeight(height);
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div
      style={{
        position: "relative",
        height: height,
        width: width,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        style={{ height: height, width: width }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        alt={"img"}
      />

      <animated.div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          ...magnifierAnimation, // animated styles here
          borderRadius: "50%",
          opacity: "1",
          border: "1px solid lightgray",
          backgroundImage: `url('${process.env.PUBLIC_URL}/${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          backgroundBlendMode: "multiply",
          backgroundColor: `rgb(${rValue}%, ${gValue}%, ${bValue}%)`,
        }}
      ></animated.div>
    </div>
  );
}

export default ImageMagnifier;
