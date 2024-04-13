import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layer2Card from "../../components/layer2Card/Layer2Card";
import Cookies from 'js-cookies'

const Layer2 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiCalled, setApiCalled] = useState(false); // Introduce a flag

  useEffect(() => {
    if (!apiCalled) { // Check if API call has already been made
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
          
          const resultData = await response.json();
          if (!response.ok) {
            throw new Error(resultData.message || "Failed to get result from backend.");
          }
          setData(resultData);
          setError(null);
        } catch (error) {
          console.error("Error:", error.message);
          setError(error.message);
          setData(null);
        } finally {
          setLoading(false);
          setApiCalled(true); // Set the flag to true after API call
        }
      };

      fetchData();
    }
  }, [location, apiCalled]); // Include apiCalled in the dependencies array

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
