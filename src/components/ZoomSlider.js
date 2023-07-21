import React from "react";
import '../styles.css'

function ZoomSlider({ zoomLevel, onZoomChange }) {
  return (
    <div>
        <input
          type="range"
          class="vranger"
          min={1}
          max={10}
          step={0.1}
          value={zoomLevel}
          onChange={(e) => onZoomChange(parseFloat(e.target.value))}
        /><br /><br />
        <p>Zoom {zoomLevel}x</p>
    </div>
    
  );
}

export default ZoomSlider;
