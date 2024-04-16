import { useState, useEffect } from "react";

const Doubt = () => {
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
      const response = await fetch("http://localhost:3000/doubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      console.log(prompt);
      const resultData = await response.json();
      console.log("jejeje");
      console.log(resultData);
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
    <div>
      <input
        type="text"
        placeholder="Still have some doubts !!"
        onChange={handlePromptChange}
        value={prompt}
      />
      <button onClick={fetchData} disabled={loading}>
        Click
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Data: {data}</p>} {/* Display data if available */}
    </div>
  );
};

export default Doubt;
