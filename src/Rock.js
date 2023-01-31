import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
const rockGesture = new GestureDescription("rock");

// Thumb
rockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
rockGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.25);
rockGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.25);
rockGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
rockGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

// Index
rockGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
rockGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);

// Pinky
rockGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
rockGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);

//Middle and Ring

for (let finger of [Finger.Middle, Finger.Ring]) {
  rockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  rockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
  rockGesture.addDirection(finger, FingerDirection.VerticalDown, 0.25);
}

export default rockGesture;
