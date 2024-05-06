import { useState, useContext } from 'react';
import Cookies from 'js-cookies';
import HashLoader from 'react-spinners/HashLoader';
import Layer2 from "../../page/layer2/layer2";
import { ThemeContext } from "../../context/ThemeContext";

import "./layer1Card.css"
import Navbar from '../navbar/Navbar';
const Layer1Card = ({ index, chapter, level, subject }) => {
  const { theme } = useContext(ThemeContext);
  const [showLayer2, setShowLayer2] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            zIndex: '50',
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
  );
};

export default Layer1Card;
