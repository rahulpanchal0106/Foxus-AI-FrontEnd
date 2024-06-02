import { useLocation } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import Layer2Card from "../../components/layer2Card/Layer2Card";
import Cookies from 'js-cookies'
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import styles from "./layer2.module.css";
import Navbar from "../../components/navbar/Navbar";
import { MyContext } from "../../context/MyContext";
import { stepLabelClasses } from "@mui/material";

const Layer2 = ({
  chapter,
  level,
  subject,
  data,
  fetchData,
  loading,
}) => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null);
  const [lessons_from_l2, setLFL2] = useState(data);
  const DBl2 = useContext(MyContext)

  useEffect(() => {
    if (DBl2) {
      // console.log("↩️↩️↩️↩️↩️↩️↩️↩️↩️↩️", DBl2)
    }
    setLFL2(DBl2);
  }, [DBl2])

  if (loading) {
    return (
      <div className={styles.loadingContainer} style={{ width: "100%" }}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const cleanName = (name) => {
    // Remove asterisks from chapter name
    return name.replace(/[*]/g, "");
  };

  return (
    <MyContext.Provider value={{ DBl2 }}>
      <div className={styles.container} style={{ width: '100%' }}>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <td><strong>Chapter:</strong></td>
              <td>{cleanName(chapter)}</td>
            </tr>
            <tr>
              <td><strong>Level:</strong></td>
              <td>{cleanName(level)}</td>
            </tr>
            <tr>
              <td><strong>Subject:</strong></td>
              <td>{subject}</td>
            </tr>
          </tbody>
        </table>
        <h2>Lessons:</h2>
        <ul className={`${styles.lessonList} ${styles.responsiveLessonList}`}>
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
    </MyContext.Provider>
  );
};

export default Layer2;
