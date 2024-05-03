// import { useLocation } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import "./layer3.css"; // Import your CSS file for styling
// import Cookies from "js-cookies";
// import HashLoader from "react-spinners/HashLoader";
// import Doubt from "../../components/doubts/Doubt";
// import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.css';

// const Layer3 = () => {
//   const location = useLocation();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quizData, setQuizData] = useState(null);
//   const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false); // State to track quiz generation loading
//   const prevLocationRef = useRef(null);

//   useEffect(() => {
//     //fetching layer3 data
//     const fetchData = async () => {
//       setLoading(true);
//       const token = Cookies.getItem("token");
//       try {
//         const response = await fetch("http://localhost:3000/layer3", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             prompt: {
//               lessonName: location.state.lessonName,
//               lessonContent: location.state.lessonContent,
//               chapter: location.state.chapter,
//               levelName: location.state.level,
//               subject: location.state.subject,
//             },
//           }),
//         });

//         const resultData = await response.json();
//         if (response.status === 501) {
//           setData(resultData.error);
//           setError(resultData.error);
//         } else if (!response.ok) {
//           throw new Error(
//             resultData.message || "Failed to get result from backend."
//           );
//         }
//         setData(resultData.result);
//         setError(null);
//       } catch (error) {
//         console.error("Error:", error.message);
//         setError(error.message);
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Check if location has changed
//     if (prevLocationRef.current !== location.pathname) {
//       fetchData();
//       prevLocationRef.current = location.pathname;
//     }
//   }, [location.pathname]);

//   // generating quiz from above explained topic
//   const generateQuiz = async () => {
//     setIsGeneratingQuiz(true); // Set loading state to true when generating quiz
//     const token = Cookies.getItem("token");
//     try {
//       const response = await fetch("http://localhost:3000/quiz", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           prompt: {
//             data: data,
//           },
//         }),
//       });
//       const resultData = await response.json();
//       console.log(resultData);
//       setQuizData(resultData);
//     } catch (error) {
//       console.error("Error:", error.message);
//     } finally {
//       setIsGeneratingQuiz(false); // Set loading state to false when quiz generation is done
//     }
//   };
//   useEffect(() => {
//     // Highlight code blocks
//     if (data) {
//       hljs.highlightAll();
//     }
//   }, [data]);
//   if (loading)
//     return (
//       <div className="loadingContainer">
//         <HashLoader color="#616A6B" />
//       </div>
//     );
//   if (error) return <div className="error">Error: {error}</div>;
//   if (!data) return null;

//   // Split data into paragraphs
// const cleanedParagraphs = data.split("\n").map((paragraph, index) => {
//   // Use regular expression to replace asterisks and numbers with an empty string
//   const cleanedText = paragraph.replace(/[*0-9]/g, "");
//   return <p key={index}>{cleanedText}</p>;
// });

//   return (
//     <div className="layer3-container">
//       <h1>Level 3 Data</h1>
//       <h2>{location.state.lessonName}</h2>
//       <div className="data">{cleanedParagraphs}</div>

//       <div className="button-container">
//         <button onClick={generateQuiz} disabled={isGeneratingQuiz} className="bi">
//           {isGeneratingQuiz ? (
//             <div className="spinner" /> // Show spinner while generating quiz
//           ) : (
//             "Generate Quiz"
//           )}
//         </button>
//       </div>
//       <br />
//       {quizData && (
//         <div>
//           {quizData.result.split("\n").map((line, index) => (
//             <p key={index}>{line}</p>
//           ))}
//         </div>
//       )}
//       <br />
//       <br />
//       <div className="doubt-container">
//         <Doubt
//           lessonName={location.state.lessonName}
//           chapter= {location.state.chapter}
//           subject= {location.state.subject}
//           lessonExplaination = {data}
//         />
//       </div>
//     </div>
//   );
// };

// export default Layer3;

/// don't erase commented code

import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./layer3.css"; // Import your CSS file for styling
import Cookies from "js-cookies";
import HashLoader from "react-spinners/HashLoader";
import Doubt from "../../components/doubts/Doubt";
import hljs from "highlight.js";
import "highlight.js/styles/night-owl.css";

const Layer3 = ({ lessonName, lessonContent, chapter, level, subject }) => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false); // State to track quiz generation loading
  const prevLocationRef = useRef(null);
  useEffect(() => {
    //fetching layer3 data
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.getItem("token");
      try {
        const response = await fetch("https://ai-tutor-be.onrender.com/layer3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt: {
              lessonName: lessonName,
              lessonContent: lessonContent,
              chapter: chapter,
              levelName: level,
              subject: subject,
            },
          }),
        });

        const resultData = await response.json();
        if (response.status === 501) {
          setData(resultData.error);
          setError(resultData.error);
        } else if (!response.ok) {
          throw new Error(
            resultData.message || "Failed to get result from backend."
          );
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

  // generating quiz from above explained topic
  const generateQuiz = async () => {
    setIsGeneratingQuiz(true); // Set loading state to true when generating quiz
    const token = Cookies.getItem("token");
    try {
      const response = await fetch("https://ai-tutor-be.onrender.com/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: {
            data: data,
          },
        }),
      });
      const resultData = await response.json();
      console.log(resultData);
      setQuizData(resultData);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsGeneratingQuiz(false); // Set loading state to false when quiz generation is done
    }
  };
  // useEffect(() => {
  //   // Highlight code blocks
  //   if (data) {
  //     const codeBlocks = data.match(/```([\s\S]*?)```/g);
  //     if (codeBlocks) {
  //       codeBlocks.forEach((block) => {
  //         const code = block.substring(3, block.length - 3);
  //         const highlightedCode = hljs.highlightAuto(code).value;
  //         const formattedBlock = `<pre><code class="hljs">${highlightedCode}</code></pre>`;
  //         setData((prevData) => prevData.replace(block, formattedBlock));
  //       });
  //     }
  //   }
  // }, [data]);
  if (loading)
    return (
      <div className="loadingContainer">
        <HashLoader color="#616A6B" />
      </div>
    );
  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return null;

  const cleanedParagraphs = data
    .split("\n\n")
    .map((paragraph, index) => {
      // Use regular expression to replace asterisks and numbers with an empty string
      const cleanedText = paragraph.replace(/[*0-9]/g, "");

      if (cleanedText.trim() === "") {
        // If the paragraph is empty after cleaning, return null
        return null;
      }

      // If the paragraph contains "\n", split it into lines and render as a bulleted list
      if (cleanedText.includes("\n")) {
        const lines = cleanedText
          .split("\n")
          .filter((line) => line.trim() !== "");
        return (
          <ul key={index}>
            {lines.map((line, idx) => (
              <li key={idx} style={{ marginLeft: "20px" }}>
              <span style={{ marginRight: "5px" }}>•</span> {/* Bullet point with left margin */}
              {line}
            </li>
            ))}
            <br />
          </ul>
        );
      }

      // Otherwise, render as a regular paragraph
      return <p key={index}>{cleanedText}</p>;
    })
    .filter((paragraph) => paragraph !== null); // Filter out any null values
    console.log(">>>>>> location state: ", location.state)
  return (
    <div className="layer3-container">
      {/* <h1>Level 3 Data</h1> */}
      <h2 className="lessonName">{lessonName}</h2>
      {/* <div className="data" dangerouslySetInnerHTML={{ __html: data }} /> */}
      <div className="data">{cleanedParagraphs}</div>
      <div className="button-container">
        <button
          onClick={generateQuiz}
          disabled={isGeneratingQuiz}
          className="bi"
        >
          {isGeneratingQuiz ? (
            <div className="spinner" /> // Show spinner while generating quiz
          ) : (
            "Generate Quiz"
          )}
        </button>
      </div>
      <br />
      {quizData && (
        <div>
          {quizData.result.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
      <br />
      <br />
      <div className="doubt-container">
        <Doubt
          lessonName={lessonName}
          chapter={chapter}
          subject={location.state.subject}
          lessonExplaination={data}
        />
      </div>
    </div>
  );
};

export default Layer3;
