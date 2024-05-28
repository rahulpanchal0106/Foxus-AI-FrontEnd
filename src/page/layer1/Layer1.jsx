
import { useState, useEffect } from 'react';

import HashLoader from 'react-spinners/HashLoader';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import styles from "./layer1.module.css";
import { useContext } from 'react';
import { MyContext } from '../../context/MyContext';

const Layer1 = ({
  levelName, 
  levelContent, 
  subject,
  data,
  loading
}) => {
  const [error, setError] = useState(null);
  const [lessons_from_l1, setLFL1] = useState(data);
  const DBl1 = useContext(MyContext);
  useEffect(() => {
    DBl1.DBl1? console.log(DBl1.DBl1.prompt):""
    if (DBl1 ) {
      // setData(selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response:null);
      // console.log("{{{{{{}}}}}} ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response.chapters:"NO CHAPTERS")
      // console.log(":::::::::::: ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].layer2:"NO LESSONS")
      console.log("🔥 ",DBl1)
      if(DBl1.DBl1){
        setLFL1(DBl1.DBl1.prompt && DBl1.DBl1.prompt.levelContent==levelContent?DBl1:null);
      }
    }
  }, [DBl1]);

  if (loading) {
    return (
      <div className={styles.loadingContainer} style={{width:"100%"}}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <MyContext.Provider value={{DBl1}}>
    <div>
      {loading ? (
        <div className={styles.loadingContainer} style={{ width: "100%" }}>
          <HashLoader color="#616A6B" />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !data ? null : (
        <div className="layer1Container" style={{padding: "5px 17px"}}>
          <div className="levelInfo">
            <p>
              <strong>Level Name:</strong> {levelName}
            </p>
            <p>
              <strong>Level Content:</strong> {levelContent}
            </p>
            <p>
              <strong>Subject:</strong> {subject}
            </p>
            <h2 className="chapterHeader">
              <strong>Chapters:</strong>
            </h2>
          </div>
          <ul className="chapterList responsive-chapter-list">
            {lessons_from_l1?lessons_from_l1.DBl1.response.chapters.map((chapter, index) => (
              <li key={index}>
                <Layer1Card
                  // data={lessons_from_l1.DBl1}
                  index={index}
                  chapter={chapter}
                  level={levelName}
                  subject={subject}
                />
              </li>
            )):data.chapters.map((chapter, index) => (
              <li key={index}>
                <Layer1Card
                  // data={data}
                  index={index}
                  chapter={chapter}
                  level={levelName}
                  subject={subject}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </MyContext.Provider>
  );
};

export default Layer1;