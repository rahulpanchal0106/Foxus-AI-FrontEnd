import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
import styles from "./layer1.module.css";
import { useEffect, useState, useRef } from 'react';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import Cookies from 'js-cookies'
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
=======
import { useEffect, useState } from 'react';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import Cookies from 'js-cookies';
>>>>>>> 50a5cb21ef8229bc2444e1845c8b8e9769c5c51b

const Layer1 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
<<<<<<< HEAD
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
=======
  const [apiCalled, setApiCalled] = useState(false); // Define apiCalled state variable

  useEffect(() => {
    if (!apiCalled) {
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
                levelName: location.state.levelName,
                levelContent: location.state.levelContent,
                subject: location.state.subject,
              },
            }),
          });

          const resultData = await response.json();
          console.log("⚠️⚠️⚠️",resultData)
          if (!response.ok) {
            throw new Error(resultData.message || 'Failed to get result from backend.');
          }
          setData(resultData);
          setError(null);
        } catch (error) {
          console.error('Error:', error.message);
          setError(error.message);
          setData(null);
        } finally {
          setLoading(false);
          setApiCalled(true);
>>>>>>> 50a5cb21ef8229bc2444e1845c8b8e9769c5c51b
        }
      };

<<<<<<< HEAD
    // Check if location has changed
    if (prevLocationRef.current !== location.pathname) {
      fetchData();
      prevLocationRef.current = location.pathname;
    }
  }, [location.pathname]);
=======
      fetchData();
    }
  }, [location.state.levelName, location.state.levelContent, location.state.subject, apiCalled]);
>>>>>>> 50a5cb21ef8229bc2444e1845c8b8e9769c5c51b

  if (loading) return <div className={styles.loadingContainer}><HashLoader color="#616A6B" /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className={styles.layer1Container}>
      <h1 className={styles.title}>level 1 data</h1>

      <div className={styles.levelInfo}>
      <p><strong>Level Name:</strong> {data.level}</p>
      <p><strong>Level Content:</strong> {data.levelContent}</p>
      <p><strong>Subject:</strong> {data.subject}</p>
<<<<<<< HEAD
      </div>
      <h2 className={styles.chapterHeader}>Chapters:</h2>
      <ul className={styles.chapterList}>
        <div className="chapter-list">
          {data.chapters.map((chapter, index) => (
            <Layer1Card  key={index} index={index} chapter={chapter} level={data.level} subject={data.subject} />
=======
      <h2>Chapters:</h2>
      <ul>
        <div className="chapter-list">
          {data.chapters.map((chapter, index) => (
            <Layer1Card key={index} index={index} chapter={chapter} level={data.level} subject={data.subject} />
>>>>>>> 50a5cb21ef8229bc2444e1845c8b8e9769c5c51b
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Layer1;
