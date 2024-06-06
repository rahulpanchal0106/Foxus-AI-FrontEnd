import React from 'react';
import { TypewriterEffect, TypewriterEffectSmooth } from "../ui/typewriter/TypeWrite";
import "./typewriter.css";

export default function TypewriterEffectDemo() {
  const words = [
    {
      text: "Learn",
      className: "v",
    },
    {
      text: "whatever",
      className: "text-orange-500 text-orange-500",
    },
    {
      text: "you",
      className: "v",
    },
    {
      text: "want,",
      className: "v",
    },
   
    {
      text: "whenever",
      className: "text-orange-500 imp-txt",
    },
    {
      text: "you",
      className: "v",
    },
    {
      text: "want.",
      className: "v",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[20rem]">
      <p className="text-highlight mb-10 vt font-extrabold leading-10 tracking-tight ">
        The journey to <span className=" text-orange-500 ">mastery</span> begins here
      </p>
      <TypewriterEffectSmooth words={words} className="something" />
    </div>
  );
}
