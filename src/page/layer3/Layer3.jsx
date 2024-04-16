import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./layer3.css"; // Import your CSS file for styling
import Cookies from 'js-cookies'


const Layer3 = () => {
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
        const response = await fetch("http://localhost:3000/layer3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            prompt: {
              lessonName: location.state.lessonName,
              lessonContent: location.state.lessonContent,
              chapter: location.state.chapter,
              levelName: location.state.level,
              subject: location.state.subject
            }
          }),
        });

        const resultData = await response.json();
        if(response.status === 501){
          setData(resultData.error)
          setError(resultData.error)
        } else if (!response.ok) {
          throw new Error(resultData.message || "Failed to get result from backend.");
        }
        setData(resultData.result);
        setError(null);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    // Check if location has changed
    if (prevLocationRef.current !== location.pathname) {
      fetchData();
      prevLocationRef.current = location.pathname;
    }
  }, [location.pathname]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  // Split data into paragraphs
  const cleanedParagraphs = data.split("\n").map((paragraph) => {
    // Use regular expression to replace asterisks and numbers with an empty string
    const cleanedText = paragraph.replace(/[*0-9]/g, "");
    return <p key={Math.random()}>{cleanedText}</p>;
  });

  return (
    <div className="layer3-container">
      <h1>Level 3 Data</h1>
      <h2>{location.state.lessonName}</h2>
      <div className="data" dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default Layer3;
