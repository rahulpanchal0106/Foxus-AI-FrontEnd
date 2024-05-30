// App.js

import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
// import Home from "./page/home/Home";
import Layer0 from "./page/layer0/layer0";
import Layer1 from "./page/layer1/Layer1";
import Layer2 from "./page/layer2/layer2"; // Import the Layer1 component
// import Layer3 from "./page/layer3/Layer3";
import Login from "./components/auth/Login"; //import the Login component
import { Register } from "./components/auth/Register";  //import the register component
import Cookies from "js-cookies";
import { ThemeContextProvider } from "./context/ThemeContext";
import ThemeProvider from "./providers/ThemeProvider";
import About from "../src/page/About/Aboutus"
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import {differenceInCalendarDays} from 'date-fns'
import RelativeDate from "./components/relative";
import Layer0Card from "./components/layer0Card/Layer0Card";
import { MyContext } from "./context/MyContext";

//acterenity testa
//import Test from './components/test'



const App = () => {
  const [selectedFromDB, setSelectedFromDB] = useState(null)
  const [data,setData]=useState(null);
  const [isLoggedIn, setLogIn] = useState(false);
  const [activityVisible,toggleActivities] = useState(false);
  const [showLayer0, setShowLayer0] = useState(false);
  const [layer1v,toggleLayer1v] = useState(false);
  const [layer0v,toggleLayer0v] = useState(true);
  const [lastDate, setLastDate] = useState("");
  
  var prevDateIdx = 0;


  async function getActivity(){
    try{
      if(!activityVisible){
        toggleActivities(!activityVisible);
        const token = Cookies.getItem("token")
        
        const response = await fetch('http://localhost:3000/activity',{
          method:'GET',
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }).catch((err)=>{
          console.error(err);
        })

        const activity = await response.json();
        // activity.reverse();
        // activity.map((chunk,i)=>{
        //   if(chunk.loginTime){
        //     chunk=activity[i-1]
        //   }
        // })
        setData(activity)
        console.log("### ",activity)
      }else{
        toggleActivities(!activityVisible);
      }
      
    }catch(err){
      console.error(err);
      window.alert("Maybe you have an old account, in that case sign up again")
    }
    
  }

  
  useEffect(()=>{
    const checkCookie=()=> Cookies.getItem("token")?setLogIn(true):setLogIn(false)
    checkCookie()
  },[data])
  
  function getLayer1(){
    toggleLayer1v(!layer1v);
  }
  function getLayer0(sd){
    // setShowLayer0(!showLayer0);
    toggleActivities(!activityVisible)
    console.log("sb ",sd)
    setSelectedFromDB(sd)
    toggleLayer0v(!layer0v);
  }
  function getCurrentDateString(){
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth();
    const yy = date.getFullYear();
    const hh = date.getHours();
    const min = date.getMinutes();
    const ss = date.getSeconds();

    return `${dd}-${mm}-${yy} ${hh}:${min}:${ss}`
  }
  
  return (
    <Router>
      <ThemeContextProvider>
        <ThemeProvider>
        <MyContext.Provider value={{ selectedFromDB, setSelectedFromDB }}>
          <div className='main'>
            <div className='gradient' />
          </div>
          <div className="container app">
            <Navbar />
            <div id="sidebar-container" style={{
              padding:activityVisible?'15px':'2px',
              
            }}>
              <button id="sb-button" style={{
                right: activityVisible?"-50%":"0px"
              }} onClick={()=>getActivity()}>{activityVisible?"❌":"👉"}</button> {/* a hover triggered animated icon icons */}
              <div id="sb-content" style={{
                borderWidth:activityVisible?'1px':'1px',
                padding:activityVisible?'15px':'0px',
                width:activityVisible?'auto':'2px',
                
              }}>
                <div id="sb-content-in">
                { 
                  //reuse the layercard components to browse the whole history
                  data&&activityVisible&&isLoggedIn?data.map((chunk,i)=>{
                    
                    if(chunk.layer0){
                      
                      return (
                        <>
                          <div id="activity-layer0" >
                            {chunk.layer0.prompt} 
                            {chunk.layer0?
                            <button onClick={()=>getLayer0(chunk)}> 👉</button>:
                            ""
                            }
                          </div>
                          {
                            <div id="chapters-container" style={{
                              display: showLayer0&&chunk.layer0.layer1[0]?"flex":"none"
                            }}>
                              <Navbar></Navbar>
                              <button id="close-chapters" style={{
                                textAlign:"end",
                                padding: "0px 15px",
                                fontSize:'1.3em'}} onClick={()=>setShowLayer0(!showLayer0)}>
                                ↩
                              </button>
                              {/* <div id="browse_l0"style={{
                                display:showLayer0?"block":"none"
                              }}>
                                <Layer0 
                                  data={chunk.layer0.prompt}
                                  // levelName = {levelName}
                                  // levelContent={levelContent}
                                  // subject={subject}
                                  // data={data}
                                  // fetchData={fetchData} 
                                  // loading={loading}
                                />
                              </div> */}
                            </div>
                          // chunk.layer0.layer1[0] && layer0v?
                          // <Layer0
                          //   data={data}
                          //   // index={data.index}
                          //   // levelName={data.level?data.level.levelName:"⚠️"}
                          //   // levelContent={data.level?data.level.levelContent:"⚠️"}
                          //   // subject={data.level?data.level.subject:"⚠️"}
                          //   // key={data.level?data.index:"⚠️"}
                          // />:
                          // "$$$$$$$$$$$$$$$$$"
                          }
                        </>
                      )
                    }else{
                      // console.log("⌚⌚⌚ ",chunk.loginTime)
                      const date = new Date(chunk.loginTime)
                      const prevDate = data[prevDateIdx].loginTime
                      const dateDiff = differenceInCalendarDays(prevDate,date)
                      prevDateIdx=i;
                      // console.log(dateDiff)
                      // chunk=data[dateDiff]
                      if((dateDiff<=-1 && i!=0)){
                        
                        return (
                          <>
                            <div id="activity-login" >
                              {
                                <RelativeDate date={prevDate}/>
                              }
                            </div>
                          </>
                        )
                      }
                      
                    }
                  }):<div className="vertical-text">Need to login :(</div> 
                }
                {
                  isLoggedIn?
                  <div id="activity-login" >
                    Today
                  </div>:
                  ""
                }
                </div>
                
                
              </div>
            </div>
            
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Layer0  />} />
              <Route path="/layer1" element={<Layer1 />} />{" "}
              {/* Add route for Layer1 */}
              <Route path="/layer2" element={<Layer2 />} />{" "}
              {/* <Route path="/layer3" element={<Layer3 />} />{" "} */}

              {/* add routh for login  */}

              <Route path="/login" element={<Login />} />{" "}

              {/* add routh for signup */}
              <Route path="/register" element={<Register />} />{" "}
              <Route path="/about" element={<About />} />{" "}

            </Routes>
            

            {/* <Test/> */}
          </div>
          </MyContext.Provider>
        </ThemeProvider>
      </ThemeContextProvider>
      <ToastContainer />
    </Router>
    
  );
};

export default App;