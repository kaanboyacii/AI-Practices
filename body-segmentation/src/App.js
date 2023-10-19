import './App.css';
import React, { useRef } from 'react';
import * as tf from "@tensorflow/tfjs"
import * as bodyPix from "@tensorflow-models/body-pix"
import Webcam from "react-webcam"

function App() {
  const WebcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={WebcamRef} style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 940,
          height: 680
        }} />
        <canvas ref={canvasRef} style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 940,
          height: 680
        }} />
      </header>
    </div>
  );
}

export default App;
