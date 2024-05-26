
import { useState } from 'react';

import HashLoader from 'react-spinners/HashLoader';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import styles from "./layer1.module.css";

const Layer1 = ({
  levelName, 
  levelContent, 
  subject,
  data,
  loading
}) => {
  const [error, setError] = useState(null);
  

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
            {data.chapters.map((chapter, index) => (
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
      )}
    </div>
  );
};

export default Layer1;