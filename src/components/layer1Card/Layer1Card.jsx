import { useNavigate } from 'react-router-dom';
import "./layer1Card.css"


const Layer1Card = ({ index, chapter, level, subject, fetchData }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Handle click event
    navigate('/layer2', { state: { chapter, level, subject } }); // Pass state to Layer2
    fetchData(); // Fetch data for Layer2
    console.log("Clicked on chapter:", chapter);
  };
  
  const cleanChapterName = (chapter) => {
    // Remove asterisks from chapter name
    return chapter.replace(/[*]/g, "");
  };
  
  return (
    <div key={index} className="layer1-card" onClick={handleClick}>
       {cleanChapterName(chapter)}
    </div>
  );
};


export default Layer1Card;
