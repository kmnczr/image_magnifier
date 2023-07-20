import React, { useEffect, useState } from "react";

function ColorSliders({ rValue, gValue, bValue, onRChange, onGChange, onBChange }) {
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "r" || event.key === "g" || event.key === "b") {
        event.preventDefault();
        setSelectedChannel(event.key);
      } else if (selectedChannel) {
        event.preventDefault();
        if (event.key === "ArrowLeft") {
          if (selectedChannel === "r") {
            onRChange(Math.max(0, rValue - 10));
          } else if (selectedChannel === "g") {
            onGChange(Math.max(0, gValue - 10));
          } else if (selectedChannel === "b") {
            onBChange(Math.max(0, bValue - 10));
          }
        } else if (event.key === "ArrowRight") {
          if (selectedChannel === "r") {
            onRChange(Math.min(100, rValue + 10));
          } else if (selectedChannel === "g") {
            onGChange(Math.min(100, gValue + 10));
          } else if (selectedChannel === "b") {
            onBChange(Math.min(100, bValue + 10));
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [rValue, gValue, bValue, onRChange, onGChange, onBChange, selectedChannel]);

  return (
    <div>
      <div>
        <label>RED: {rValue}%</label><br/>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={rValue}
          onChange={(e) => onRChange(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>GREEN: {gValue}%</label><br/>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={gValue}
          onChange={(e) => onGChange(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>BLUE: {bValue}%</label><br/>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={bValue}
          onChange={(e) => onBChange(parseInt(e.target.value))}
        />
      </div>
      
    </div>
  );
}

export default ColorSliders;
