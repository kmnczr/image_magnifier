import React from "react";

function ZoomSlider({ zoomLevel, onZoomChange }) {
  return (
    <div>
        <label for="zoom">Zoom {zoomLevel}x</label><br></br>
        <input
          type="range"
          min={1}
          max={10}
          step={0.1}
          value={zoomLevel}
          onChange={(e) => onZoomChange(parseFloat(e.target.value))}
        />
    </div>
    
  );
}

export default ZoomSlider;
