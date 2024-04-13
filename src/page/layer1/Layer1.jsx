
import { useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import Cookies from 'js-cookies'

const Layer1 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.getItem('token');
      try {
        const response = await fetch("http://localhost:3000/layer1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
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
      <h1>level 1 data</h1>
      <p><strong>Level Name:</strong> {data.level}</p>
      <p><strong>Level Content:</strong> {data.levelContent}</p>
      <p><strong>Subject:</strong> {data.subject}</p>
      <h2>Chapters:</h2>
      <ul>
      <div className="chapter-list">
        {data.chapters.map((chapter, index) => (
          <Layer1Card key={index} index={index} chapter={chapter} level={data.level} subject={data.subject}/>
        ))}
      </div>
      </ul>
    </div>
  );
};

export default Layer1;
