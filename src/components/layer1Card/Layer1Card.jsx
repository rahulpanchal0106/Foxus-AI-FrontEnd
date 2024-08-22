import { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookies';
import HashLoader from 'react-spinners/HashLoader';
import Layer2 from "../../page/layer2/layer2";
import { ThemeContext } from "../../context/ThemeContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./layer1Card.css"
import Navbar from '../navbar/Navbar';
import { MyContext } from '../../context/MyContext';
import CheckCircle from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';


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
      if(DBl1.DBl1.layer2 && DBl1.DBl1 && DBl1) {
        setDBl2(null)
        setDBl2(DBl1.DBl1.layer2[index])
      }

    }
  }, [DBl1]);

  const fetchData = async () => {
    setLoading(true);
    const token = Cookies.getItem('token');
    try {
      const response = await fetch(import.meta.env.VITE_SERVER+'/layer2', {
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
          index: index,
          
        }),
      });

      const resultData = await response.json();
      if(response.status==429){
        toast.warn("You have attempted too soon. Please try again in about 10 seconds",{position:"top-right"})
        setTimeout(() => {
          toast.info("Try reading the already fetched content!");
        }, 200);  
      }
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
      console.error('Error🍻:', error.message);
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
    console.log("🟨🟨🟨🟨 ",index)
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
        style={{
          "--gradient": data?"linear-gradient(to bottom, #51a7ed, #23eac5, #23ea8d)" :"linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff)"
        }}
        onClick={() => {
          setShowLayer2(!showLayer2); 
          handleClick()
          return;
        }}
      >
        <div className="chapter-name">
          <div className="notiglow"></div>
          <div className="notiborderglow"></div>
          <p>
            {cleanChapterName(chapter)}
          </p>
          {data ? <CheckCircle /> : loading? <div className="loader_lesson"></div>:""}
        </div>

        
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
          <button className='arrow-button' onClick={handleClick}>
            {showLayer2 ? "" : '+'}
            <ArrowBackIcon fontSize="large" />
          </button>
          </div>
          
          <Layer2
            chapter={chapter}
            level={level}
            subject={subject}
            data={data?data:[]} 
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
