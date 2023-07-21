import React, { useState } from "react";
import ImageMagnifier from "./components/ImageMagnifier";
import ZoomSlider from "./components/ZoomSlider";
import ColorSliders from "./components/ColorSliders";
import './styles.css'

function App() {
  const [zoomLevel, setZoomLevel] = useState(2);
  const [rValue, setRValue] = useState(100);
  const [gValue, setGValue] = useState(100);
  const [bValue, setBValue] = useState(100);

  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };

  const handleRChange = (newRValue) => {
    setRValue(newRValue);
  };

  const handleGChange = (newGValue) => {
    setGValue(newGValue);
  };

  const handleBChange = (newBValue) => {
    setBValue(newBValue);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="imageContainer">
        <ImageMagnifier
          width={"768px"}
          height={"432px"}
          src="images/city.jpg"
          zoomLevel={zoomLevel}
          rValue={rValue}
          gValue={gValue}
          bValue={bValue}
        />
        </div>
        <ZoomSlider zoomLevel={zoomLevel} onZoomChange={handleZoomChange} />
      </div>
      <div className="container">
      <ColorSliders
          rValue={rValue}
          gValue={gValue}
          bValue={bValue}
          onRChange={handleRChange}
          onGChange={handleGChange}
          onBChange={handleBChange}
        />
      </div>
    </div>
  );
}

export default App;
