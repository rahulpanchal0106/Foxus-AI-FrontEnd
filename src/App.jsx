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

import { ThemeContextProvider } from "./context/ThemeContext";
import ThemeProvider from "./providers/ThemeProvider";
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//acterenity testa
import Test from './components/test'


const App = () => {
  return (
    <Router>
      <ThemeContextProvider>
        <ThemeProvider>
        <div className='main'>
                    <div className='gradient' />
                </div>
          <div className="container app">
            <Navbar />
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