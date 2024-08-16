import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layer0Card from "../../components/layer0Card/Layer0Card";
import styles from "./layer0.module.css";
import Cookies from "js-cookies";
import { toast } from "react-toastify";
import TypewriterEffectDemo from "../../components/Type/TypeWriter";
import { MyContext } from "../../context/MyContext";
import { Tooltip } from "@mui/material";
import AnimatedTooltip from "../../components/ui/ToolTip";
import { ThemeContext } from "../../context/ThemeContext";
import Card from "../../components/Card/Card";
import FeedBack from "../../components/Feedback/feedback";
import FeedbackCard from "../../components/Feedback-card/feedback-card";
import { Info, InfoRounded, InfoSharp, InfoTwoTone } from "@mui/icons-material";


const Layer0 = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext)
  const { selectedFromDB } = useContext(MyContext);
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (selectedFromDB ) {

      

      setPrompt(null);
      setResult(null);
      setPrompt(selectedFromDB.layer0.prompt);
      setResult(selectedFromDB.layer0.response);

      console.log("))*)*)*)* ",selectedFromDB)
      

    }
  }, [selectedFromDB]);

  function InfoMessage() {
    return toast.info("Type 'Language' for languages (e.g., 'HTML Language')",{
      position:'top-center'
    })
    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setVisible(false);
    //   }, 5000);
  
    //   return () => clearTimeout(timer); // Cleanup the timer
    // }, []);
  
    // if (!visible) return null;
  
    // return (
    //   <p className="text-xs text-gray-500">
    //     <InfoRounded className="text-xs" /> Type 'Language' for languages (e.g., 'JavaScript Language')
    //   </p>
    // );
  }

  useEffect(() => {
    setApiCalled(false);
    
  }, [prompt]);

  useEffect(()=>{
    InfoMessage()
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
      const response = await fetch(import.meta.env.VITE_SERVER+"/layer0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      

      const resultData = await response.json();
      if(response.status==429){
        toast.warn("You have attempted too soon. Please try again in about 10 seconds",{position:"top-right"})
      }else if (resultData.length === 0) {
        setResult("No response from PaLM2");
        setError("No response from PaLM2");
        toast.error("No response from PaLM2", {
          position: "top-right",
        });
      } else if (!response.ok) {
        toast.error(resultData.message, {
          position: "top-right",
        });
        throw new Error(resultData.message || "Failed to get result from backend.");
      }
      setResult(resultData);
      setError(null);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
      setError(error.message);
      setResult(null);
    } finally {
      setLoading(false);
      setApiCalled(true);
    }
  };

  const checkTokenAndNavigate = () => {
    const token = Cookies.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      if (!apiCalled) {
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
    <MyContext.Provider value={{ selectedFromDB }}>
      {/* // <MyContextProvider> */}
      <div className={styles.container}>
        <TypewriterEffectDemo />
        
        <input
          type="text"
          value={prompt}
          onChange={handlePromptChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter your subject or topic here e.g. JavaScript Language"
          className={styles.in}
          title="Type your query or topic here."
        />

        <button
          onClick={checkTokenAndNavigate}
          disabled={loading}
          className={styles.btn}
          // style={{
          //   background:loading?'red':''
          // }}
        >

          {loading ? (
            // <div className="loader-threedot"></div>
            <img src="/search.gif" alt="" className={styles.icon} />
          ) : (
            // <img src="/search.png" alt="" className={styles.icon} />
            <img src="/search.png" alt="" className={styles.icon} />
          )}

          <div
            style={{ display: loading ? "flex" : "none", position: "absolute" }}
            className={styles.loaderThreedot}
          ></div>
        </button>
        


        {/* <button id="sb-button" style={{display:"flex", flexDirection:"row",justifyContent:"center",alignItems:"center",position:"relative"}} >
            <InfoTwoTone/>
            <div id="sb-top" className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-gray-800"></div>
            <div id="sb-info" style={{
              backgroundColor:"red",
            }}>If you are searching for a Programming language, Then please do attach "Language" after the topic. e.g. JavaScript Language </div>
        </button> */}

        {error && <p>{error}</p>}
        {result && (
          <div className="card">
            {/* <Tooltip  >
            <button className="button" id="reload-button" onClick={()=>window.location.reload()}>Reload</button>
          
          </Tooltip> */}

            {Array.isArray(result) ? (
              result.map((level, index) => (
                <Layer0Card
                  index={index}
                  levelName={level.levelName}
                  levelContent={level.levelContent}
                  subject={level.subject}
                  key={index}
                />

                // <Card
                //   index={index}
                //   levelName={level.levelName}
                //   levelContent={level.levelContent}
                //   subject={level.subject}
                //   key={index}
                // />
              ))
            ) : (
              <ul style={{ textAlign: "left" }}>
                {result.result.split("\n\n").map((item, index) => (
                  <li key={index} style={{ marginLeft: "20px" }}>
                    <span style={{ marginRight: "5px" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* <div id="reload_button">
            <AnimatedTooltip  items={[
              {
              id:1,
              name:"Clear State",
              designation:"Reload for",
              designation1:"accurate history",
              image: "./loop.png",
              github:window.location
              }
            ]}/>
          </div> */}
            <FeedbackCard/> 
          </div>
        )}
      </div>
    </MyContext.Provider>
  );
};

export default Layer0;
