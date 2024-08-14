import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookies';
import Layer1 from "../../page/layer1/Layer1";
import { ThemeContext } from "../../context/ThemeContext";
import "./layer0Card.css";
import Navbar from "../navbar/Navbar";
import { MyContext } from "../../context/MyContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from "../Card/Card";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";
import Write from "../Type/Write";

const Layer0Card = ({ index, levelName, levelContent, subject }) => {
  const { theme } = useContext(ThemeContext);
  const [showLayer1, setShowLayer1] = useState(false);
  const [data, setData] = useState(null);
  const [DBl1, setDBl1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showChapters,setShowChapters] = useState(true);
  
  const {selectedFromDB} = useContext(MyContext);

  useEffect(() => {
    if (selectedFromDB && !data) {
      setData(null);
      setDBl1(null)
      // console.log("💀💀💀 ",selectedFromDB.layer0.layer1[index]?
      //   selectedFromDB.layer0.layer1[index].prompt.levelContent:"No lavel\n",
      //   levelContent
      // )
      setData(selectedFromDB.layer0.layer1[index] && selectedFromDB.layer0.layer1[index].prompt.levelContent === levelContent?selectedFromDB.layer0.layer1[index].response:null);
      // console.log("{{{{{{}}}}}} ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response.chapters:"NO CHAPTERS")
      // console.log(":::::::::::: ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].layer2:"NO LESSONS")
      
      setDBl1(selectedFromDB.layer0.layer1[index])
      

    }
  }, [selectedFromDB,data]);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch(import.meta.env.VITE_SERVER+'/layer1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: {
            levelName: levelName,
            levelContent: levelContent, 
            subject: subject
          },
          index: index,
          layer0_indecies: [],
          layer1_indecies: []
        }),   
      });

      const resultData = await response.json();
      if (!response.ok) {
        throw new Error(
          resultData.message ||
            resultData.error ||
            'Failed to get result from backend.'
        );
      }
      if(response.status==429){
        toast.warn("You have attempted too soon. Please try again in about 10 seconds",{position:"top-right"})
        setTimeout(() => {
          toast.info("Try reading the already fetched content!");
        }, 200);  
      }
      setData(resultData);
      setError(null);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message || error );
    } finally {
      setLoading(false);
    }
  };

  // const handleClick = (levelName, levelContent, subject) => {
  //   navigateToLayer1({ levelName, levelContent, subject });
  // };
  const handleClick = () => {
    setShowLayer1(!showLayer1);
    
    console.log("DBl1: ",DBl1)
    if (!data && !showLayer1 && !loading) {
      fetchData();
    }
  };
  function handleChaptersClose(){
    setShowChapters(!showChapters);
  }
  
  return (
    <MyContext.Provider value={{ DBl1 }}>
      {/* <MyContextProvider> */}
      <div className="layer0-card-container">
        <div key={index} className="layer0-card" onClick={() => handleClick()}>
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <p
            className="level-name"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Write word={levelName}/> {data ? <CheckCircle /> : ""}
          </p>
          <p className="level-content">{levelContent}</p>
        </div>
        <div
          id="chapters-container"
          style={{
            display: showLayer1 ? "flex" : "none",
          }}
        >
          <div className="main">
            <div className="gradient" />
          </div>
          <Navbar></Navbar>
          <button
            id="close-chapters"
            className="arrow-button-one"
            style={{
              textAlign: "end",
              padding: "0px 15px",
              fontSize: "1.3em",
            }}
            onClick={() => {
              setShowLayer1(!showLayer1);
              window.location.reload(); //SOLUTION TO THE STATE MERGE ISSUE 🤡
            }}
          >
            <ArrowBackIcon fontSize="large" />
          </button>
          <Layer1
            levelName={levelName}
            levelContent={levelContent}
            subject={subject}
            data={data}
            fetchData={fetchData}
            loading={loading}
          />
        </div>
      </div>
    </MyContext.Provider>
  );

  <Card/>

};

export default Layer0Card;
