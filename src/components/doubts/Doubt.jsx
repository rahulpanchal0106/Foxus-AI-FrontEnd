import { useState, useEffect } from "react";
import "./doubt.css"; // Import your CSS file

const Doubt = ({lessonName,chapter,subject,lessonExplaination}) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ai-tutor-be.onrender.com/doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt,
          lessonName: lessonName,
          chapter: chapter,
          subject: subject,
          lessonExplaination: lessonExplaination
        }),
      });
      const resultData = await response.json();
      if (response.status === 501) {
        setError(resultData.error);
      } else if (!response.ok) {
        throw new Error(
          resultData.message || "Failed to get result from backend."
        );
      } else {
        setData(resultData);
        setError(null);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Log data state for debugging
    console.log("Data:", data);
  }, [data]); // Run this effect whenever data state changes

  return (
    <div className="container">
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Still have some doubts !!"
          onChange={handlePromptChange}
          value={prompt}
        />
        <button className="button" onClick={fetchData} disabled={loading}>
        {loading ? (
            <div className="spinner" />
          ) : (
            "Ask"
          )}
        </button>
      </div>
      {error && <p className="error">Error: {error}</p>}
      {data && <p className="message">{data}</p>}
    </div>
  );
};

export default Doubt;
