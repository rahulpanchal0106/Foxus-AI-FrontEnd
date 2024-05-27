

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layer0Card from "../../components/layer0Card/Layer0Card";
import styles from "./layer0.module.css";
import Cookies from "js-cookies";
import { toast } from "react-toastify";
import TypewriterEffectDemo from "../../components/Type/TypeWriter";

const Layer0 = (data) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiCalled, setApiCalled] = useState(false); // Introduce a flag
  const navigate = useNavigate();

  //reset Api called
  useEffect(() => {
    setApiCalled(false);
  }, [prompt]);

  
  useEffect(()=>{
    if(data){
      console.log("LLLLLLLLLLLLLLLLLL ",data)
      setPrompt(data.data);
    }
  },[])

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const getLayer0Result = async () => {
    setLoading(true);
    if (prompt.trim() === "") {
      setError("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.getItem("token");
      const response = await fetch("http://localhost:3000/layer0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const resultData = await response.json();
      console.log("⚠️⚠️⚠️", resultData);
      if (resultData.length == 0) {
        console.log("🪲🪲🪲🪲🪲🪲🪲🪲🪲🪲🪲🪲🪲");
        setResult("No response from PaLM2");
        setError("No response from PaLM2");
        toast.error("No response from PaLM2", {
          position: "top-right",
        });
      } else if (!response.ok) {
        toast.error(error.message, {
          position: "top-right",
        });
        throw new Error(
          resultData.message || "Failed to get result from backend."
        );
      }
      setResult(resultData);
      setError(null);
    } catch (error) {
      console.error("⭕Error:", error.message);
      toast.error(error.message, {
        position: "top-right",
      });
      setError(error.message);
      setResult(null);
    } finally {
      setLoading(false);
      setApiCalled(true); // Set the flag to true after API call
    }
  };

  const checkTokenAndNavigate = () => {
    const token = Cookies.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      if (!apiCalled) {
        // Check if API call has already been made
        getLayer0Result();
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkTokenAndNavigate();
    }
  };
  
  return (
    <div className={styles.container}>
      <TypewriterEffectDemo />
      <input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        onKeyPress={handleKeyPress} // Add key press event listener
        placeholder="Enter your subject or topic here"
        className={styles.in}
      />
      <button
        onClick={checkTokenAndNavigate}
        disabled={loading}
        className={styles.btn}
      >
        {loading ? (
          <img src="/search.gif" alt="" className={styles.icon} />
        ) : (
          <img src="/search.png" alt="" className={styles.icon} />
        )}
      </button>
  
      {error && <p>{error}</p>}
      {result && (
        <div className="card">
          {Array.isArray(result) ? ( // Check if result is an array
            result.map((level, index) => (
              <Layer0Card
                index={index}
                levelName={level.levelName}
                levelContent={level.levelContent}
                subject={level.subject}
                key={index}
              />
            ))
          ) : (
            <ul style={{textAlign:"left"}}>
              {result.result.split("\n\n").map((item, index) => (
                <li key={index} style={{ marginLeft: "20px" }}>
                <span style={{ marginRight: "5px" }}>•</span> {/* Bullet point with left margin */}
                {item}
              </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Layer0;
