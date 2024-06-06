import React from "react";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "../ui/typewriter/TypeWrite";
import "./typewriter.css";

export default function TypewriterEffectDemo() {
  const words = [
    {
      text: "Learn",
      className: "v",
    },
    {
      text: "whatever",
      className: "text-orange-500 imp-txt dark:text-orange-500",
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
      className: "text-orange-500 dark:text-ornage-500 imp-txt",
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
    <div className="flex flex-col items-center justify-center h-[10rem] lg:h-[20rem] mt-5">
      <p className="sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 vt font-extrabold leading-10 tracking-tight sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl">
        The journey to <span className="text-orange-500">mastery</span> begins
        here
      </p>

      <TypewriterEffectSmooth words={words} className="something" />
    </div>
  );
}
