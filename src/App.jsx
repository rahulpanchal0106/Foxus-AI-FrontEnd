// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

//acterenity testa
//import Test from './components/test'



const App = () => {
  
  const [data,setData]=useState(null);
  const [isLoggedIn, setLogIn] = useState(false);
  const [activityVisible,toggleActivities] = useState(false);
  
  const [layer1v,toggleLayer1v] = useState(false);
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
        setData(activity)
        console.log(activity)
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
                {
                  //reuse the layercard components to browse the whole history
                  data&&activityVisible&&isLoggedIn?data.map((chunk,i)=>{
                    
                    if(chunk.layer0){
                      
                      return <div id="activity-layer0" >{chunk.layer0.prompt} {
                        chunk.layer0.layer1[0]?
                        
                        <button onClick={()=>getLayer1()}> 👉</button> // need icons
                        :
                        ""
                        
                      }</div>
                    }else{
                      const date = new Date(chunk.loginTime)
                      const prevDate = data[prevDateIdx].loginTime
                      const dateDiff = differenceInCalendarDays(prevDate,date)
                      prevDateIdx=i;
                      if(dateDiff<=-1 || i==0){
                        return <div id="activity-login" >
                          {
                            <RelativeDate date={date}/>
                          }
                        </div> 
                      }
                      return ""
                    }
                  }):<div className="vertical-text">Need to login :(</div>
                    
                  
                }
              </div>
            </div>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Layer0 />} />
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
          
        </ThemeProvider>
      </ThemeContextProvider>
      <ToastContainer />
    </Router>
    
  );
};

export default App;