import { useLocation } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import Layer2Card from "../../components/layer2Card/Layer2Card";
import Cookies from 'js-cookies';
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import styles from "./layer2.module.css";
import Navbar from "../../components/navbar/Navbar";
import { MyContext } from "../../context/MyContext";
import { stepLabelClasses } from "@mui/material";

import "./layer2.module.css"
import FeedbackCard from "../../components/Feedback-card/feedback-card";
const Layer2 = ({
  chapter,
  level,
  subject,
  data,
  fetchData,
  loading,
}) => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const prevLocationRef = useRef(null);
  const [lessons_from_l2, setLFL2] = useState(data);
  const DBl2 = useContext(MyContext)

  useEffect(() => {
    if (DBl2) {
      // console.log("↩️↩️↩️↩️↩️↩️↩️↩️↩️↩️", DBl2)
    }
    setLFL2(DBl2);
  }, [DBl2])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  const cleanName = (name) => {
    // Remove asterisks from chapter name
    return name.replace(/[*]/g, "");
  };

  return (
    <MyContext.Provider value={{ DBl2 }}>
      <div className={styles.container}>
        {/* <table className={styles.infoTable}>
          <tbody>
            <tr>
              <td><strong>Chapter:</strong></td>
              <td>{cleanName(chapter)}</td>
            </tr>
            <tr>
              <td><strong>Level:</strong></td>
              <td>{cleanName(level)}</td>
            </tr>
            <tr>
              <td><strong>Subject:</strong></td>
              <td>{subject}</td>
            </tr>
          </tbody>
        </table> */}

        <div id="info-parent" style={{
          width: "100%",
          // height: "20vh",
          // background: "var(--bg-dark)",
          // background: "linear-gradient(344deg, rgba(40,40,55,1) 0%, rgba(16,16,18,1) 50%)",
          // boxShadow: "4px 6px 14px #00000036",
          borderRadius: "7px",
          // color: "#F9F9F9",
          // padding: "16px",
          // transition: "all .3s",
          display:'flex',
          flexDirection: window.screen.width<550?'column':'row',
          // flexDirection:'column',
          justifyContent:'space-evenly',
          alignItems:'flex-start'
        }}  className="flex">
          {/* <div className="notiglow"></div>
          <div className="notiborderglow"></div> */}
          <div className="info" style={{
            display:'flex',
            flexDirection:'column',
            marginBottom: '10px'
          }}  >
            <p style={{color:"#309ef3"  ,fontWeight:'light',padding:'0px', fontSize:'0.8em',width:"100%", textAlign:'left'}} >Chapter</p>
            {cleanName(chapter)}
          </div>
          <div className="info" style={{ overflow:'auto',marginBottom: '10px' }} >
          <p style={{color:"#309ef3" ,fontWeight:'light',padding:'0px', fontSize:'0.8em',width:"100%", textAlign:'left'}} >Level</p>
            {cleanName(level)}
          </div>
          <div className="info" style={{  overflow:'auto' }} >
          <p style={{color:"#309ef3" ,fontWeight:'light',padding:'0px', fontSize:'0.8em',width:"100%", textAlign:'left'}} >Subject</p>
            {subject}
          </div>
        </div>


        {/* <h2 className="font-extrabold">Lessons:</h2> */}
        <ul className={styles.lessonList}>
          {data.map((lesson, index) => (
            <li key={index} className={styles.lessonListItem}>
              <Layer2Card
                lessonName={lesson.lessonName}
                lessonContent={lesson.lessonContent}
                chapter={chapter}
                level={level}
                subject={subject}
                index={index}
              />
            </li>
          ))}
          <li className='flex w-full justify-center'>
            <FeedbackCard />
          </li>
        </ul>
      </div>
    </MyContext.Provider>
  );
};

export default Layer2;
