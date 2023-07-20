import React, { useState } from "react";
import ImageMagnifier from "./components/ImageMagnifier";
import ZoomSlider from "./components/ZoomSlider";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // Align components vertically
    justifyContent: "center", // Center components horizontally
    alignItems: "center", // Center components vertically
  },
  slidersContainer: {
    display: "flex",
    flexDirection: "row", // Arrange components horizontally
    alignItems: "flex-start", // Align components at the top of the container
    marginTop: "20px",
    marginLeft: "20px", // Add left margin for spacing from the image
  },
};

function App() {
  const [zoomLevel, setZoomLevel] = useState(2);

  const handleZoomChange = (newZoomLevel) => {
    setZoomLevel(newZoomLevel);
  };

  return (
    <div className="App" style={styles.container}>
      <div>
        <ImageMagnifier
          width={"768px"}
          height={"432px"}
          src="images/city.jpg" 
          zoomLevel={zoomLevel}
        />
      </div>
      <div style={styles.slidersContainer}>
        <ZoomSlider zoomLevel={zoomLevel} onZoomChange={handleZoomChange} />
      </div>
    </div>
  );
}

export default App;
