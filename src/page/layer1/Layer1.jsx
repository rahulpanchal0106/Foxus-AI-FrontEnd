import { useState, useEffect, useContext } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import styles from "./layer1.module.css";
import { MyContext } from '../../context/MyContext';

const Layer1 = ({
  levelName, 
  levelContent, 
  subject,
  data,
  loading
}) => {
  const [error, setError] = useState(null);
  const [lessonsFromL1, setLessonsFromL1] = useState(data);
  const DBl1 = useContext(MyContext);

  useEffect(() => {
    if (DBl1 && DBl1.DBl1) {
      console.log("🔥 ", DBl1);
      if (DBl1.DBl1.prompt && DBl1.DBl1.prompt.levelContent === levelContent) {
        setLessonsFromL1(DBl1);
      }
    }
  }, [DBl1]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <MyContext.Provider value={{ DBl1 }}>
      <div className={styles.layer1Container}>
        <div className={styles.levelInfo}>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}><strong>Level Name:</strong> {levelName}</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}><strong>Level Content:</strong> {levelContent}</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}><strong>Subject:</strong> {subject}</div>
          </div>
          <h2 className={styles.chapterHeader}><strong>Chapters:</strong></h2>
        </div>
        <ul className={`${styles.chapterList} responsive-chapter-list`}>
          {lessonsFromL1 ? lessonsFromL1.DBl1.response.chapters.map((chapter, index) => (
            <li key={index}>
              <Layer1Card
                index={index}
                chapter={chapter}
                level={levelName}
                subject={subject}
              />
            </li>
          )) : data.chapters.map((chapter, index) => (
            <li key={index}>
              <Layer1Card
                index={index}
                chapter={chapter}
                level={levelName}
                subject={subject}
              />
            </li>
          ))}
        </ul>
      </div>
    </MyContext.Provider>
  );
};

export default Layer1;
