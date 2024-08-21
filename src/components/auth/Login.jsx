import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NavLink,useNavigate } from "react-router-dom";
import "./mix.css"; // Replace with your actual CSS file
import Cookies from 'js-cookies';
import { toast } from 'react-toastify';
import { UserNameContext } from '../../context/usernameContext';
import HashLoader from 'react-spinners/HashLoader';


const Login = () => {
    const [passShow, setPassShow] = useState(false);
    const [isLoading, setIsloading] = useState(false);
     const navigate = useNavigate(); 

    const [inpval, setInpval] = useState({
        username: "",
        password: ""
    })


   
  

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const logInuser = async (e) => {
       
        e.preventDefault();

        const { username, password } = inpval;

        if (username === "") {
            alert("Please enter your username");
            return;
        } else if (password === "") {
            alert("Please enter your password");
            return;
        } else if (password.length < 0) {
            alert("Password must be at least 6 characters");
            return;
        }

        

        // Send login request to backend
        try {
            setIsloading(true);
            const response = await fetch(import.meta.env.VITE_SERVER+'/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
              });
            setIsloading(false);
            if (response.ok) {
                const data = await response.json();
                navigate('/')
                // Handle successful login (e.g., store token, redirect)
                
                console.log("Login successful!", data); 
                const token = data.token;
                Cookies.setItem('token',token,{expires:'24h'});
                // navigate("/"); // If using useNavigate

                // alert("Login successfull !");
                toast.success("Login Successful.", {
                    position: "top-right"
                });
                                                                                                                         

            } else {
                const errorText = await response.text();
                alert(errorText || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again later.");
        }

        
    }
    function handleClick(e){
        //window.alert("A critical bug has occurred, so we've disabled the logins for sometime")
        //return;
        logInuser(e);
        Cookies.setItem('username',inpval.username,{expires:'5h'})
    }

    return (
        <>
        {/* <UserNameContext.Provider value={{inpval}}> */}

        
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome Back, Log In</h1>
                        <p>We're delighted to see you again! Please proceed to log in.</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label className='for-username lab' htmlFor='username'>Username</label>
                            <input type="text" value={inpval.username} onChange={setVal} name="username" id='username' placeholder='Enter Your Username'/>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password' className='lab'>Password</label>
                            <div className='two'>
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id='password' placeholder='Enter Your Password'/>
                                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </div>
                            </div>
                        </div>
                        <button className='btn' style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:"space-evenly",
                            alignItems:'center',
                            transition:'all 0.3s ease'
                        }} onClick= {
                            handleClick
                        }>
                            Login 
                        {isLoading?<HashLoader color='gray'size={15}/>:""}
                        </button>

                       
                        
                        <p className='btn-signup'>Don't have an account? <NavLink to="/register">Sign Up</NavLink> </p>


                       
                       
                    </form>

                    

                    
                </div>
               
                
                
            </section>
            {/* </UserNameContext.Provider> */}
        </>
    )
}

export default Login
