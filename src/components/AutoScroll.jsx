import React, { useEffect } from 'react';

const AutoScroll = ({ chunk }) => {
  useEffect(() => {
      const promptElement = document.getElementById(`prompt-${chunk.time}`);
      const containerElement = document.querySelector(".scroll-container");
      console.log(chunk, promptElement)
    // if (promptElement && containerElement) {
      if (promptElement.offsetWidth >= containerElement.offsetWidth) {
        promptElement.classList.add('scroll-content');
      } else {
        promptElement.classList.add('scroll-content');
      }
    // }
  }, [chunk]);

  return (
    <div className="scroll-container">
      <p id={`prompt-${chunk.time}`}>
        {chunk.layer0.prompt}
      </p>
    </div>
  );
};

export default AutoScroll;
