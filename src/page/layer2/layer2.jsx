import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Layer2Card from "../../components/layer2Card/Layer2Card";
import Cookies from 'js-cookies'
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import styles from "./layer2.module.css";

const Layer2 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch("http://localhost:3000/layer2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: {
            chapter: location.state.chapter,
            subject: location.state.subject,
            levelName: location.state.level,
          },
        }),
      });
      
      console.log(location.state.subject);
      
      const resultData = await response.json();
      console.log("ResultData: ",resultData)
      if (resultData == null || resultData==[]) {
        setData("No response from PaLM2");
        setError("No response from PaLM2");
        toast.error("No response from PaLM2", {
          position: "top-right"
        });
      } else if (!response.ok) {
        throw new Error(resultData.message || resultData.error || "Failed to get result from backend.");
      }
      setData(resultData);
      setError(null);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if location has changed
    if (prevLocationRef.current !== location.pathname) {
      fetchData();
      prevLocationRef.current = location.pathname;
    }
  }, [location.pathname]); // Trigger only on location.pathname change

  if (loading) return <div className={styles.loadingContainer}><HashLoader color="#616A6B" /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const cleanName = (chapter) => {
    // Remove asterisks from chapter name
    return chapter.replace(/[*]/g, "");
  };

  return (
    <div>
      {/* <h1>level 2 data</h1> */}
      <p className={styles.chapter}>
        <strong>Chapter:</strong> {cleanName(location.state.chapter)}
      </p>
      <p>
        <strong>Level:</strong> {cleanName(location.state.level)}
      </p>
      <p>
        <strong>Subject:</strong> {location.state.subject}
      </p>
      <h2>Lessons:</h2>
      <ul>
        <div className="lesson-list">
          {data.map((lesson, index) => (
            <Layer2Card
              key={index}
              lessonName={lesson.lessonName}
              lessonContent={lesson.lessonContent}
              chapter={lesson.chapter}
              level={lesson.level}
              subject={lesson.subject}
              index = {index}
            />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Layer2;