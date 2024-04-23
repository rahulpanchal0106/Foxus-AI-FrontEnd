import React, { useState } from "react";
import "./layer2Card.css";
import Layer3 from "../../page/layer3/Layer3";

const Layer2Card = ({
  lessonName,
  lessonContent,
  chapter,
  level,
  subject,
  index,
}) => {
  const [showLayer3, setShowLayer3] = useState(false);
  const [activeCardIndex,setActiveCardIndex] = useState(null)
  const handleClick = () => {
    setShowLayer3(!showLayer3);
    setActiveCardIndex(index);
  };

  return (
    <div className="layer-container">
      <div className={`layer2-card ${showLayer3 && "active"}`} onClick={handleClick}>
        <h3>{lessonName}</h3>
        <p>{lessonContent}</p>
      </div>
      {showLayer3 && activeCardIndex === index && (
        <div className="layer3-content">
          <Layer3
            lessonName={lessonName}
            lessonContent={lessonContent}
            chapter={chapter}
            level={level}
            subject={subject}
          />
        </div>
      )}
    </div>
  );
};

export default Layer2Card;