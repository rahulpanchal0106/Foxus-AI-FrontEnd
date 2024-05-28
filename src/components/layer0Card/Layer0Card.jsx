import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookies';
import Layer1 from "../../page/layer1/Layer1";
import { ThemeContext } from "../../context/ThemeContext";
import "./layer0Card.css";
import Navbar from "../navbar/Navbar";
import { MyContext } from "../../context/MyContext";

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
      setData(selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response:null);
      // console.log("{{{{{{}}}}}} ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response.chapters:"NO CHAPTERS")
      // console.log(":::::::::::: ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].layer2:"NO LESSONS")
      
      
      setDBl1(selectedFromDB.layer0.layer1[index])

    }
  }, [selectedFromDB]);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/layer1', {
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
    if (!data && !showLayer1 && !loading) {
      fetchData();
    }
  };
  function handleChaptersClose(){
    setShowChapters(!showChapters);
  }
  return (
    <MyContext.Provider value={{DBl1}}>
    <div className="layer0-card-container">
      
      <div
        key={index}
        className="layer0-card"
        onClick={() => handleClick()}
      >
        
        <p className="level-name">{levelName} {data?" 🔥":" ⭕"}</p>
        <p className="level-content">{levelContent}</p>
        
      </div>
      <div id="chapters-container" style={{
        display: showLayer1?"flex":"none"
      }}>
          <div className='main'>
            <div className='gradient' />
          </div>
        <Navbar></Navbar>
        <button id="close-chapters" style={{
          textAlign:"end",
          padding: "0px 15px",
          fontSize:'1.3em'}} onClick={()=>setShowLayer1(!showLayer1)}>
          ↩
        </button>
        <Layer1
          levelName = {levelName}
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
};

export default Layer0Card;
