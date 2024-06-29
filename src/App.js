import React from "react";
import Weather from "./Components/Weather/Weather"; // Importing the Weather component
import videobackground from "./Assets/VideoBackground.mp4";
import "./App.css";

const App = () => {
  return (
    <div className="video-container">
      {/* Video background element */}
      <video autoPlay muted loop id="background-video">
        <source src={videobackground} type="video/mp4" />
      </video>
      {/* Main application component */}
      <div>
        <Weather />
      </div>
    </div>
  );
};

export default App;
