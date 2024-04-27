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
      className: "text-orange-500 dark:text-orange-500",
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
      className: "text-orange-500 dark:text-ornage-500",
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
    <div className="flex flex-col items-center justify-center h-[20rem] ">
      <p className="mb-10 vt">
        The journey to mastery begins here
      </p>
      <TypewriterEffectSmooth words={words} className="something" />
    </div>
  );
}
