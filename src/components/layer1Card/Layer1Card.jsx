import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookies';
import HashLoader from 'react-spinners/HashLoader';
import Layer2 from "../../page/layer2/layer2";
import { ThemeContext } from "../../context/ThemeContext";

import "./layer1Card.css"
import Navbar from '../navbar/Navbar';
import { MyContext } from '../../context/MyContext';
const Layer1Card = ({ index, chapter, level, subject }) => {
  const { theme } = useContext(ThemeContext);
  const [showLayer2, setShowLayer2] = useState(false);
  const [DBl2, setDBl2] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {DBl1} = useContext(MyContext);

  useEffect(() => {
    if (DBl1 && !data && DBl1.DBl1) {
      //setData(selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response:null);
      // console.log("{{{{{{}}}}}} ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response.chapters:"NO CHAPTERS")
      // console.log(":::::::::::: ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].layer2:"NO LESSONS")
      
      // console.log("🟩🟩🟩 ",DBl1.DBl1.layer2 && DBl1.DBl1 && DBl1?DBl1.DBl1.layer2[index]:"")
      if(DBl1.DBl1.layer2 && DBl1.DBl1 && DBl1) setDBl2(DBl1.DBl1.layer2[index])

    }
  }, [DBl1]);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/layer2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: {
            chapter: chapter,
            subject: subject,
            levelName: level,
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

  useEffect(()=>{
    if(DBl1.DBl1 && DBl1.DBl1.layer2[index]){
      
      setData(DBl1.DBl1.layer2[index]?DBl1.DBl1.layer2[index].response:null);
    }
  },[DBl1])

  const handleClick = () => {
    setShowLayer2(!showLayer2);
    if (!data && !showLayer2 && !loading) {
      fetchData();
    }
    
  };

  const cleanChapterName = (chapter) => {
    return chapter.replace(/[*]/g, '');
  };

  return (
    <MyContext.Provider value={{DBl2}}>
    <div className="layer-container">
      <div
        key={index}
        className="layer1-card"
        onClick={() => {
          setShowLayer2(!showLayer2); 
          handleClick()
          return;
        }}
      >
        <p>{data?" 🔥":" ⭕"}</p>
        {cleanChapterName(chapter)}
        
        {/*<div className={`layer1-card ${showLayer2 ? 'active' : ''}`} onClick={handleClick}>
          
          
          <button className="accordion-button">
            {showLayer2 ? '-' : '+'}
          </button>
          
        </div>
        */}
      </div>
      <div className={`layer-container ${showLayer2 ? 'active' : ''}`}>
        
        <div className='' style={
          showLayer2 ? { 
            top: '0px',
            zIndex: '40',
            position: 'fixed',
            width: '100%',
            height: '100vh',
            padding: 'inherit',
            background: theme === 'light'?'white' : '#10172a',
            left: '0px',
            overflow: 'auto',
            display: 'flex',
            flexDirection : 'column'
          } : {display: 'none'}
        }>
                <div className='main'>
            <div className='gradient' />
          </div>
          <Navbar></Navbar>
          <div className="close">
          <button className="accordion-button-in" onClick={handleClick}>
            {showLayer2 ? 'Go Back' : '+'}
          </button>
          </div>
          
          <Layer2
            chapter={chapter}
            level={level}
            subject={subject}
            data={data} 
            fetchData={fetchData} 
            loading={loading}
          />
        </div>
      </div>
    </div>
    </MyContext.Provider>
  );
};


export default Layer1Card;
