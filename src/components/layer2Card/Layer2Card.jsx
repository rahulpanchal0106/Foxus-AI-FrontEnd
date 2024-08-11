import React, { useContext, useEffect, useState } from "react";
import "./layer2Card.css";
import Layer3 from "../../page/layer3/Layer3";
import Cookies from 'js-cookie'; // Import Cookies
import { MyContext } from "../../context/MyContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Fullscreen from "@mui/icons-material/Fullscreen";

import DoneIcon from '@mui/icons-material/CheckCircle';

const Layer2Card = ({
  lessonName,
  lessonContent,
  chapter,
  level,
  subject,
  index,
}) => {
  const [showLayer3, setShowLayer3] = useState(false);
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(false); // State to manage loading

  const {DBl2} = useContext(MyContext)

  useEffect(()=>{
    if(DBl2 && !data && DBl2.DBl2){
      // console.log("🤡🤡🤡🤡🤡 ",lessonName ,DBl2.DBl2&& DBl2?DBl2.DBl2.layer3[0]:"")
      setData(null)
      setData(DBl2.DBl2&&DBl2.DBl2.layer3[index]?DBl2.DBl2.layer3[index].response:null)
    }
  },[DBl2])

  const fetchData = async () => {
    setLoading(true); // Set loading to true
    // Fetch data
    const token = Cookies.get('token'); // Get token from cookies
    try {
      const response = await fetch(import.meta.env.VITE_SERVER+"/layer3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: {
            lessonName: lessonName,
            lessonContent: lessonContent,
            chapter: chapter,
            levelName: level,
            subject: subject,
          },
          index: index
        }),
      });

      const resultData = await response.json();
      if (response.status === 501) {
        setData(resultData.error);
      } else if (!response.ok) {
        throw new Error(
          resultData.message || "Failed to get result from backend."
        );
      }
      setData(resultData.result);
    } catch (error) {
      console.error("Error:", error.message);
      setData(null);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleClick = () => {
    setShowLayer3(!showLayer3);
    if (!data && !showLayer3 && !loading) {
      fetchData(); // Fetch data only if not already fetched
    }
  };
 
  return (
    <div className="layer-container">
      <div
        className={`layer2-card-out ${showLayer3 ? "active" : ""}`}
        onClick={handleClick}
      >
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <div className={`layer2-card-in ${showLayer3 ? "active" : ""}`}>
          
          <h3 style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            color: "var(--color)"
          }}>

            <strong className="lesson">{lessonName} </strong>
            {data?
              <DoneIcon  />
            :" "}
          </h3>
          <div style={{
            display:"flex",
            flexDirection:"row",
            width: '100%',
            justifyContent:"space-between"
            
          }}>
            <p className="lessonContent">{lessonContent}</p>
            <button className="accordion-button">{showLayer3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}</button>
          </div>
        </div>
      </div>
      <div className="layer3-parent" style={{ display: showLayer3 ? "flex" : "none" }}>

        <Layer3
          lessonName={lessonName}
          lessonContent={lessonContent}
          chapter={chapter}
          level={level}
          subject={subject}
          data={data} // Pass data to Layer3 component
          fetchData={fetchData} // Pass fetchData function to Layer3 component
          loading={loading} // Pass loading state to Layer3 component
        />
      </div>
    </div>
  );
};

export default Layer2Card;
