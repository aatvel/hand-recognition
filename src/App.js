import React, { useRef, useState, useEffect } from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

import * as fp from "fingerpose";
// import fpg from 'fingerpose-gestures'
import victory from "./img/victory.png";
import thumbs_up from "./img/thumbs_up.png";
// import finger_splayed from './img/five.png'
import pinching from './img/pinching.png'
import ok from './img/ok.png'

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const images = {thumbs_up:thumbs_up,
    victory:victory,
    // finger_splayed: finger_splayed, 
    // ok: ok, 
    // pinching: pinching
  };

  const runHandpose = async () => {
    const net = await handpose.load();
    // console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video, true);
      // console.log(hand);

       // ADDED GESTURE HANDLING

       if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          // fpg.Gestures.fingerSplayedGesture,
          // fpg.Gestures.pinchingGesture,
          // fpg.Gestures.okGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 9);
        // console.log(gesture)
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          setEmoji(gesture.gestures[maxConfidence].name);
   
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          mirrored={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {emoji !== null ? (
          <img
            src={images[emoji]}
            alt={emoji}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;
