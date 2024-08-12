import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AnimatedTooltip from "../../components/ui/ToolTip";
import "./About.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { UserNameContext } from "../../context/usernameContext";


const people = [
  {
    id: 1,
    name: "Rahul Panchal",
    image: "./2.png",
    github: "https://github.com/rahulpanchal0106"
  },
  {
    id: 2,
    name: "Jay Patel",
    image: "./demon.jpg",
    github:"https://github.com/Jay100125"
  },
  {
    id: 3,
    name: "Akshay Sangani",
    image: "./3.jpeg",
    github:"https://github.com/Akki-patel"
  },
  {
    id: 4,
    name: "Jeet Patel",
    image: "4.jpeg",
    github:"https://github.com/Jeet9788"
  },
  {
    id: 5,
    name: "Om Makwana",
    image: "5.jpeg",
    github:"https://github.com/makwanaom"
  },
];

const About = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // const {username} = useContext(UserNameContext);
  const username = Cookies.get('username')
  
  console.log(username)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ username, feedback });

    const timestamp = new Date().toISOString(); 

    const data = {
      Username: username,
      Timestamp: timestamp,
      Email: email,
      Feedback: feedback
    };

    try {
      const response = await axios.post(import.meta.env.VITE_SHEET, data);
      console.log(response);
      setEmail('');
      setFeedback('');
      setError(null);
      setSuccess(true);
      toast.success("Feedback submitted successfully!", {
        position: "top-right"
      });
    } catch (err) {
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
        setError(`Error: ${err.response.status} - ${err.response.data}`);
      } else if (err.request) {
        console.error('Error request:', err.request);
        setError('Error: No response received from the server.');
      } else {
        console.error('Error message:', err.message);
        setError(`Error: ${err.message}`);
      }
      console.error('Error config:', err.config);
      setSuccess(false);
    }
    
  };

  

  return (
    <div className="about-container">
      <section className="about-content">
        <h1 className=" font-extrabold">About Us</h1>
        {/* <h2 >Welcome to Foxus AI</h2> */}
        <p>
          At Foxus AI, our mission is to revolutionize the way you learn and explore new topics. We harness the power of artificial intelligence to create a personalized, engaging, and interactive educational experience.
        </p>
        
        <h2 >Our Vision</h2>
        <p>
          We believe that everyone deserves access to high-quality education tailored to their individual needs and learning pace. Foxus AI is designed to provide just that by adapting to your skill level and offering a comprehensive learning journey.
        </p>
        
        <h2 >How It Works</h2>
        <ul>
          <li><strong>Search Anything You Want:</strong> Begin your educational journey by searching for any topic you're interested in. Our intelligent search function quickly finds the most relevant content for you.</li>
          <li><strong>Select Your Level:</strong> Whether you're a beginner, intermediate, or expert, our platform categorizes content to suit your level of understanding. Simply choose your level to get started.</li>
          <li><strong>Explore Topics:</strong> Based on your selected level, we present a range of topics for you to delve into. Each topic is carefully curated to enhance your learning experience.</li>
          <li><strong>Detailed Chapters:</strong> Click on a topic to reveal chapters that offer in-depth explanations. Our content is designed to be comprehensive, clear, and engaging.</li>
          <li><strong>Interactive Quizzes:</strong> After studying a chapter, test your knowledge with our automatically generated quizzes. These quizzes are based on the detailed explanations provided in the chapters.</li>
          <li><strong>Ask Doubts:</strong> Have questions or need further clarification? Use our doubt resolution feature to get answers from our Foxus AI.</li>
        </ul>
        
        <h2 >Features</h2>
        <ul>
          <li><strong>Personalized Learning Paths:</strong> Content tailored to your level of expertise.</li>
          <li><strong>In-Depth Explanations:</strong> Detailed chapters that cover topics thoroughly.</li>
          <li><strong>Interactive Quizzes:</strong> Custom quizzes to reinforce your learning.</li>
          <li><strong>Doubt Resolution:</strong> Get answers to your questions from our Foxus AI.</li>
        </ul>
      </section>

      <div className="team-section">
        <h2 className=" font-extrabold">Meet Our Team</h2>
        <AnimatedTooltip items={people} />
      </div>
      

      <div className="feedback-form-container">
        <h2 className="feedback-title">Feel free to share your feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            className="username-input"
            placeholder="Enter your Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="feedback-textarea"
            rows="4"
            placeholder="Write your feedback here..."
            value={feedback}
            required
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="feedback-submit-button"
          >
            Submit
          </button>
        </form>
        {error && <p color="red" className="error-message">{error}</p>}
        
      </div>
    </div>
  );
};

export default About;
