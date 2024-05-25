import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Layer2Card from "../../components/layer2Card/Layer2Card";
import Cookies from 'js-cookies'
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import styles from "./layer2.module.css";
import Navbar from "../../components/navbar/Navbar";



const Layer2 = ({
  chapter,
  level,
  subject,
  data,
  fetchData,
  loading,
}) => {
  const location = useLocation();
  //const [data, setData] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null);

  
  if (loading) {
    return (
      <div className={styles.loadingContainer} style={{width:"100%"}}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const cleanName = (chapter) => {
    // Remove asterisks from chapter name
    return chapter.replace(/[*]/g, "");
  };

  return (
    

    <div className={styles.container} style={{width: '100%'}}>
      
      <p>
        <strong>Chapter:</strong> {cleanName(chapter)}
      </p>
      <p>
        <strong>Level:</strong> {cleanName(level)}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>
      <h2>Lessons:</h2>
      <ul className={styles.lessonList}>
        {data.map((lesson, index) => (
          <li key={index} className={styles.lessonListItem}>
            <Layer2Card
              key={index}
              lessonName={lesson.lessonName}
              lessonContent={lesson.lessonContent}
              chapter={chapter}
              level={level}
              subject={subject}
              index={index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Layer2;
