import { useState, useRef, useEffect, useContext } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Layer1Card from '../../components/layer1Card/Layer1Card';
import styles from "./layer1.module.css";

import { MyContext } from '../../context/MyContext';

const Layer1 = ({
  levelName, 
  levelContent, 
  subject,
  data,
  loading
}) => {
  const [error, setError] = useState(null);
  const [lessonsFromL1, setLFL1] = useState(data);
  const DBl1 = useContext(MyContext);
  const dataRef = useRef(null); 
  useEffect(() => {
    DBl1.DBl1? console.log(DBl1.DBl1.prompt):""
    setLFL1(null);
    if (DBl1 ) {
      // setData(selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response:null);
      // console.log("{{{{{{}}}}}} ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].response.chapters:"NO CHAPTERS")
      // console.log(":::::::::::: ",selectedFromDB.layer0.layer1[index]?selectedFromDB.layer0.layer1[index].layer2:"NO LESSONS")

      if(DBl1.DBl1 ){
        setLFL1(null);
        // data=null;
        dataRef.current = null; 
        setLFL1(DBl1.DBl1.prompt && DBl1.DBl1.prompt.levelContent==levelContent?DBl1:null);
      }
    }
  }, [DBl1]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <HashLoader color="#616A6B" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <MyContext.Provider value={{ DBl1 }}>
      <div className={styles.layer1Container}>
        {/* <div className={styles.levelInfo}> */}
          {/* <div className={styles.tableRow}>
            <div className={styles.tableCell}><strong>Level Name:</strong> {levelName}</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}><strong className=' p-0'>Level Content:</strong> {levelContent}</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.tableCell}><strong>Subject:</strong> {subject}</div>
          </div>
          <h2 className={styles.chapterHeader}><strong>Chapters:</strong></h2>
        </div> */}
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
          flexDirection:'row',
          justifyContent:'space-evenly'


        }}>
          {/* <div className="info" style={{
              display:'flex',
              flexDirection:'column'
            }}> */}
            {/* <div style={{
              display:'flex',
              flexDirection:'row'
            }}  > */}
              <div className="info" style={{ width:'100%', overflow:'auto', marginBottom:'10px' }} >
                <p style={{color:"#309ef3"  ,fontWeight:'light',padding:'0px', fontSize:'0.8em',width:"100%", textAlign:'left'}} >Level</p>
              
                <p style={{textAlign:"left"}}>
                {levelName}
                </p>
                </div>  
              </div>
              <div className="info" style={{ width:'100%', overflow:'auto', marginBottom:'10px' }} >
              <p style={{color:"#309ef3" ,fontWeight:'light',padding:'0px', fontSize:'0.8em',width:"100%", textAlign:'left'}} >Subject</p>
              <p style={{textAlign:"left"}}>
                {subject}
              </p>
              </div>
            {/* </div> */}
            <div className="info" style={{width:'100%', overflow:'auto' }} >
              <p style={{color:"#309ef3" ,fontWeight:'light',padding:'0px', fontSize:'0.8em',width:"100%", textAlign:'left'}} >About this level</p>
              <p style={{textAlign:"left"}}>
                {levelContent}
              </p>
            </div>
          {/* </div> */}

        <ul className={`${styles.chapterList} responsive-chapter-list`}>
          {lessonsFromL1 ? lessonsFromL1.DBl1.response.chapters.map((chapter, index) => (
            <li key={index}>
              <Layer1Card
                index={index}
                chapter={chapter}
                level={levelName}
                subject={subject}
              />
            </li>
          )) : data.chapters.map((chapter, index) => (
            <li key={index}>
              <Layer1Card
                index={index}
                chapter={chapter}
                level={levelName}
                subject={subject}
              />
            </li>
          ))}
        </ul>
      </div>
    </MyContext.Provider>
  );
};

export default Layer1;
