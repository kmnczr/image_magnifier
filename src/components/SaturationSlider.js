import React from "react";

function SaturationSlider({ saturation, onSaturationChange }) {
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSaturationChange(Math.max(0, saturation - 10));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      onSaturationChange(Math.min(100, saturation + 10));
    }
  };

  return (
    <div>
        <label for="saturation">Saturation {saturation}%</label><br></br>
        <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={saturation}
        onChange={(e) => onSaturationChange(parseInt(e.target.value))}
        onKeyDown={handleKeyDown}
        />
    </div>
    
  );
}

export default SaturationSlider;
