import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./layer3.css"; // Import your CSS file for styling

const Layer3 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/layer3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

        if (!response.ok) {
          throw new Error("Failed to get result from backend.");
        }

        const resultData = await response.json();
        setData(resultData.result);
        setError(null);
      } catch (error) {
        console.error("Error:", error.message);
        setError("Failed to fetch result from backend.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  // Split data into paragraphs
  const paragraphs = data.split("\n").map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  return (
    <div className="layer3-container">
      <h1>Level 3 Data</h1>
      <h2>{location.state.lessonName}</h2>
      <div className="data">{paragraphs}</div>
    </div>
  );
};

export default Layer3;
