import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./layer3.css"; // Import your CSS file for styling
import Cookies from 'js-cookies'


const Layer3 = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.getItem('token');
      try {
        const response = await fetch("http://localhost:3000/layer3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
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
        }).then(res=>{
          if(res){
            console.log(res.message)
            return res.json();
          }

        });
        if (!response.ok) {
          const errMess = response.message;
          console.log("🔥🔥🔥 ",errMess)
          throw new Error(errMess);  //Error showing only on console here ⚠️⚠️⚠️⚠️
        }


        const resultData = await response.json();
        setData(resultData.result);
        setError(null);
      } catch (error) {
        console.error("Error:", error.message);
        setError();
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
  const cleanedParagraphs = data.split("\n").map((paragraph) => {
    // Use regular expression to replace asterisks and numbers with empty string
    const cleanedText = paragraph.replace(/[*0-9]/g, "");
    return <p key={Math.random()}>{cleanedText}</p>;
  });

  return (
    <div className="layer3-container">
      <h1>Level 3 Data</h1>
      <h2>{location.state.lessonName}</h2>
      <div className="data">{cleanedParagraphs}</div>
    </div>
  );
};

export default Layer3;
