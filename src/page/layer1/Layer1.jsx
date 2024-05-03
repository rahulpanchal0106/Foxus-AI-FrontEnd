import { useLocation } from 'react-router-dom';
import styles from "./layer1.module.css";
import { useEffect, useState, useRef } from 'react';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import Cookies from 'js-cookies'
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Layer1 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null);
  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch("https://ai-tutor-be.onrender.com/layer1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: {
            levelName: location.state.levelName,
            levelContent: location.state.levelContent,
            subject: location.state.subject
          }
        }),
      });

      const resultData = await response.json();
      if (resultData.length === 0) {
        setData("No response from PaLM2")
        setError("No response from PaLM2")
        toast.error("No response from PaLM2", {
          position: "top-right"
        });
      } else if (!response.ok) {
        throw new Error(resultData.message || "Failed to get result from backend.");
      }
      setData(resultData);
      setError(null);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false); // Update loading state regardless of success or failure
    }
  };

  useEffect(() => {
    // Check if location has changed
    if (prevLocationRef.current !== location.pathname) {
      fetchData();
      prevLocationRef.current = location.pathname;
    }
  }, [location.pathname]);

  if (loading) return <div className={styles.loadingContainer}><HashLoader color="#616A6B" /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className={styles.layer1Container}>
      <div className={styles.levelInfo}>
        <div>
          <p><strong>Level Name:</strong> {data.level}</p>
          <p><strong>Level Content:</strong> {data.levelContent}</p>
          <p><strong>Subject:</strong> {data.subject}</p>
        </div>
        <h2 className={styles.chapterHeader}> 
         <strong>Chapters:</strong> 
        </h2>
      </div>
      <ul className={`${styles.chapterList} responsive-chapter-list`}>
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
    </div>);
};

export default Layer1;