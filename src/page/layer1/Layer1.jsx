import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookies';
import HashLoader from 'react-spinners/HashLoader';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import styles from "./layer1.module.css";

const Layer1 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null); // Ref to keep track of previous location pathname

  useEffect(() => {
    // Check if location pathname has changed
    if (prevLocationRef.current !== location.pathname) {
      fetchData();
      prevLocationRef.current = location.pathname;
    }
  }, [location.pathname]);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/layer1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: {
            levelName: location.state?.levelName,
            levelContent: location.state?.levelContent,
            subject: location.state?.subject,
          },
        }),
      });

      const resultData = await response.json();
      if (!response.ok) {
        throw new Error(
          resultData.message ||
            resultData.error ||
            'Failed to get result from backend.'
        );
      }
      setData(resultData);
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  
  
  return (
    <div>
      {loading ? (
        <div className={styles.loadingContainer} style={{ width: "100%" }}>
          <HashLoader color="#616A6B" />
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : !data ? null : (
        <div className="layer1Container">
          <div className="levelInfo">
            <p>
              <strong>Level Name:</strong> {data.level}
            </p>
            <p>
              <strong>Level Content:</strong> {data.levelContent}
            </p>
            <p>
              <strong>Subject:</strong> {data.subject}
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
                  level={data.level}
                  subject={data.subject}
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
