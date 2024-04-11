import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layer2Card from "../../components/layer2Card/Layer2Card";
import Cookies from 'js-cookies'

const Layer2 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.getItem('token');
      try {
        const response = await fetch("http://localhost:3000/layer2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
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
        if (!response.ok) {
          throw new Error("Failed to get result from backend.");
        }

        const resultData = await response.json();
        setData(resultData);
        setError(null);
      } catch (error) {
        console.error("Error:", error.message);
        setError("Failed to fetch result from backend.");
        setData(null);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchData();
  }, [location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>level 2 data</h1>
      <p>
        <strong>Chapter:</strong> {location.state.chapter}
      </p>
      <p>
        <strong>Level:</strong> {location.state.level}
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
            />
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Layer2;
