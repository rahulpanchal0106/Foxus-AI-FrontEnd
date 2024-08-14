import React, { useState, useRef, useEffect, useContext } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import FeedbackCard from '../../components/Feedback-card/feedback-card';
import { MyContext } from '../../context/MyContext';
import styles from './layer1.module.css';

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
  const dataRef = useRef(null);

  useEffect(() => {
    if (DBl1 && DBl1.DBl1) {
      console.log(DBl1.DBl1.prompt);
      setLessonsFromL1(null);

      const promptMatch = DBl1.DBl1.prompt && DBl1.DBl1.prompt.levelContent === levelContent;
      if (promptMatch) {
        dataRef.current = DBl1;
        setLessonsFromL1(DBl1);
      } else {
        dataRef.current = null;
        setLessonsFromL1(null);
      }
    }
  }, [DBl1, levelContent]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const renderChapters = (chapters) => {
    return chapters.map((chapter, index) => (
      <li key={index}>
        <Layer1Card
          index={index}
          chapter={chapter}
          level={levelName}
          subject={subject}
        />
      </li>
    ));
  };

  return (
    <MyContext.Provider value={{ DBl1 }}>
      <div className={styles.layer1Container} style={{ width: "100%" }}>
        <div
          className="lg:w-5/6 w-full"
          id="info-parent"
          style={{
            borderRadius: "7px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <div className="info" style={{ width: '100%', overflow: 'auto', marginBottom: '10px' }}>
            <p style={{ color: "#309ef3", fontWeight: 'light', padding: '0px', fontSize: '0.8em', width: "100%", textAlign: 'left' }}>Level</p>
            <p style={{ textAlign: "left" }}>{levelName}</p>
          </div>
          <div className="info" style={{ width: '100%', overflow: 'auto', marginBottom: '10px' }}>
            <p style={{ color: "#309ef3", fontWeight: 'light', padding: '0px', fontSize: '0.8em', width: "100%", textAlign: 'left' }}>Subject</p>
            <p style={{ textAlign: "left" }}>{subject}</p>
          </div>
          <div className="info" style={{ width: '100%', overflow: 'auto' }}>
            <p style={{ color: "#309ef3", fontWeight: 'light', padding: '0px', fontSize: '0.8em', width: "100%", textAlign: 'left' }}>About this level</p>
            <p style={{ textAlign: "left" }}>{levelContent}</p>
          </div>
        </div>

        <ul className={`${styles.chapterList} responsive-chapter-list`}>
          {lessonsFromL1
            ? renderChapters(lessonsFromL1.DBl1.response.chapters)
            : renderChapters(data.chapters)
          }
          <li className='flex w-full justify-center'>
            <FeedbackCard />
          </li>
        </ul>
      </div>
    </MyContext.Provider>
  );
};

export default Layer1;
