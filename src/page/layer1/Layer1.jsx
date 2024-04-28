import { useLocation } from 'react-router-dom';
import styles from "./layer1.module.css";
import { useEffect, useState, useRef } from 'react';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import Cookies from 'js-cookies'
import { toast } from 'react-toastify';

const Layer1 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null);

  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.getItem('token');
      try {
        const response = await fetch("http://localhost:3000/layer1", {
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
        if(resultData.length === 0){
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


    fetchData();
  }, [location]);

  if (loading) return <div className={styles.loadingContainer}><div className={styles.loading}></div></div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className={styles.layer1Container}>
      <h1 className={styles.title}>level 1 data</h1>

      <div className={styles.levelInfo}>
        <p><strong>Level Name:</strong> {data.level}</p>
        <p><strong>Level Content:</strong> {data.levelContent}</p>
        <p><strong>Subject:</strong> {data.subject}</p>
        <h2 className={styles.chapterHeader}>Chapters:</h2>
      </div>
      <ul className={styles.chapterList}>
        <div className="chapter-list">
          {data.chapters.map((chapter, index) => (
            <Layer1Card key={index} index={index} chapter={chapter} level={data.level} subject={data.subject} />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Layer1;