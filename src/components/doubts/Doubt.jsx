import { useState, useEffect, useContext } from "react";
import "./doubt.css"; // Import your CSS file
import ReactMarkdown from "react-markdown";
import Latex from "react-latex";
import { ThemeContext } from "../../context/ThemeContext";
import "highlight.js/styles/night-owl.css";
import Highlight from 'react-highlight';

const Doubt = ({ lessonName, chapter, subject, lessonExplaination }) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);

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
          lessonName,
          chapter,
          subject,
          lessonExplaination,
        }),
      });
      const resultData = await response.json();
      if (!response.ok) {
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
    console.log("Data:", data);
  }, [data]);

  const renderLatexExpressions = (text) => {
    if (!text) return null;
    const latexRegex = /\$(.*?)\$/g;
    const parts = text.split(latexRegex);

    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return part;
      } else {
        return <Latex key={index}>{part}</Latex>;
      }
    });
  };
  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <>
          <div className="cb-top">
            <p className="lang">{className}</p>
            <div className="actions">
              <button>Copy</button>
            </div>
          </div>
          <Highlight className={match[1]} {...props}>
            {children}
          </Highlight>
        </>
      ) : (
        <>
          <code className={className} {...props}>
            {children}
          </code>
        </>
      );
    },
  };
  return (
    <div className="container" style={{ background: theme === 'light' ? 'white' : '#18181b' }}>
      
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Have any doubt?"
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
      {data && <p className="message">
        <ReactMarkdown components={components}>
          {data}
        </ReactMarkdown>
      </p>}
    </div>
  );
};

export default Doubt;
