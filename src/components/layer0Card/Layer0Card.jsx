import { Link, useNavigate } from "react-router-dom";
import "./layer0Card.css";

const Layer0Card = ({ index, levelName, levelContent, subject }) => {
  const navigate = useNavigate();
  const navigateToLayer1 = (data) => {
    navigate("/layer1", { state: data });
  };

  const handleClick = (levelName, levelContent, subject) => {
    navigateToLayer1({ levelName, levelContent, subject });
  };

  return (
    <div className="layer0-card-container">
      <div
        key={index}
        className="layer0-card"
        onClick={() => handleClick(levelName, levelContent, subject)}
      >
        <p className="level-name">{levelName}</p>
        <p className="level-content">{levelContent}</p>
      </div>
    </div>
  );
};

export default Layer0Card;
