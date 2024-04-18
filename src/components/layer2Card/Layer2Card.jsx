import React, { useState } from "react";
import "./layer2Card.css";
import Layer3 from "../../page/layer3/Layer3";

const Layer2Card = ({ lessonName, lessonContent, chapter, level, subject }) => {
  const [showLayer3, setShowLayer3] = useState(false);

  const handleClick = () => {
    setShowLayer3(!showLayer3);
  };

  return (
    <div className="layer-container">
      <div className="layer2-card" onClick={handleClick}>
        <h3>{lessonName}</h3>
        <p>{lessonContent}</p>
      </div>
      {showLayer3 && (
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
