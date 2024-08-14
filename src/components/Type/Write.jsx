import React from "react";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "../ui/typewriter/TypeWrite";
import "./typewriter.css";

export default function Write({word}) {
  const words = [
    {
      text:word,
      className:"l",
    }
  ];

  return (
    
      <TypewriterEffectSmooth words={words} className="something-w" />
  );
}
