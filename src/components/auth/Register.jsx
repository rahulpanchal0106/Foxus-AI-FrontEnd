import React, { useState } from 'react';
import "./mix.css";
import { AlternateEmail, Backspace, Visibility, VisibilityOff } from '@mui/icons-material';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

export const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setcPassShow] = useState(false);
  const navigate = useNavigate(); 
  const [inpval, setInpval] = useState({
    fname: "",
    username: "",
    password: "",
    cpassword: ""
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  }

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, username, password, cpassword } = inpval;

    if (fname === "") {
      alert("please enter your name");
      return;
    }
    if (username === "") {
      alert("please enter your username");
      return;
    }
    if (password === "") {
      alert("enter your password");
      return;
    }
    if (cpassword === "") {
      alert("enter your confirm password");
      return;
    }
    if (password !== cpassword) {
      alert("password and confirm password not match");
      return;
    }

    try {
      const response = await axios.post('https://ai-tutor-be.onrender.com/signup', {
        username: inpval.username,
        password: inpval.password,
      });

      if (response.data.success) {
        
        toast.success("Account created.");
        navigate('/login');
      } else {
        
        toast.error("Account creation failed. Please try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Sign Up</h1>
            <p>We're excited that you'll be using our project to learn <br /> something new! We hope you'll find it enjoyable and useful.</p>
          </div>

          <form>
            <div className='form_input'>
              <label htmlFor='fname' className='lab'>Name</label>
              <input type="text" onChange={setVal} value={inpval.fname} name="fname" id='fname' placeholder='Enter Your Name'></input>
            </div>

            <div className='form_input'>
              <label htmlFor='username' className='lab'>Username</label>
              <input type="text" onChange={setVal} value={inpval.username} name="username" id='username' placeholder='Enter Your username'></input>
            </div>

            <div className='form_input'>
              <label htmlFor='password' className='lab'>Password</label>
              <div className='two'>
                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id='password' placeholder='Enter Your Password'></input>
                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>

            <div className='form_input'>
              <label htmlFor='cpassword' className='lab'>Confirm Password</label>
              <div className='two'>
                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name="cpassword" id='cpassword' placeholder='Confirm Password'></input>
                <div className='showpass' onClick={() => setcPassShow(!cpassShow)}>
                  {!cpassShow ? <Visibility /> : <VisibilityOff />}
                </div>
              </div>
            </div>

            <button className='btn' onClick={addUserdata}>
              Sign Up
            </button>
            <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
          </form>
        </div>
      </section>
    </>
  );
};
