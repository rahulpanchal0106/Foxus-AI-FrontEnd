
import { useNavigate } from 'react-router-dom';
import "./layer1Card.css"


const Layer1Card = ({ index, chapter,level,subject }) => {
  const navigate = useNavigate();
  const navigateToLayer2 = (data) => {
    navigate('/layer2', { state: data }); 
  };
  const handleClick = (chapter,level,subject) => {
    // Handle click event
    navigateToLayer2({ chapter, level, subject }); 
    console.log("Clicked on chapter:", chapter);
  };
  
  const cleanChapterName = (chapter) => {
    // Remove asterisks from chapter name
    return chapter.replace(/[*]/g, "");
  };

  return (
    <div key={index} className="layer1-card" onClick={() => handleClick(chapter,level,subject)}>
       {cleanChapterName(chapter)}
    </div>
  );
};

export default Layer1Card;
