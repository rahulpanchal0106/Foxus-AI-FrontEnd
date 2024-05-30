import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AnimatedTooltip from "../../components/ui/ToolTip";
import "./About.css";

const people = [
  {
    id: 1,
    name: "Rahul Panchal",
    image: "./2.jpeg",
  },
  {
    id: 2,
    name: "Jay Patel",
    image: "./1.jpeg",
  },
  {
    id: 3,
    name: "Akshay Sangani",
    image: "./3.jpeg",
  },
  {
    id: 4,
    name: "Jeet Patel",
    image: "4.jpeg",
  },
  {
    id: 5,
    name: "Om Makwana",
    image: "5.jpeg",
  },
];



const About = () => {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have an API endpoint to submit the feedback
      await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });
      console.log("Feedback submitted:", feedback);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }

    checkTokenAndNavigate();
  };

  const checkTokenAndNavigate = () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  };

  return (
    <div className="about-container">
      <section className="about-content">
        <h1>About Us</h1>
        <h2>Welcome to AI Tutor</h2>
        <p>
          At AI Tutor, our mission is to revolutionize the way you learn and explore new topics. We harness the power of artificial intelligence to create a personalized, engaging, and interactive educational experience.
        </p>
        
        <h2>Our Vision</h2>
        <p>
          We believe that everyone deserves access to high-quality education tailored to their individual needs and learning pace. AI Tutor is designed to provide just that by adapting to your skill level and offering a comprehensive learning journey.
        </p>
        
        <h2>How It Works</h2>
        <ul>
          <li><strong>Search Anything You Want:</strong> Begin your educational journey by searching for any topic you're interested in. Our intelligent search function quickly finds the most relevant content for you.</li>
          <li><strong>Select Your Level:</strong> Whether you're a beginner, intermediate, or expert, our platform categorizes content to suit your level of understanding. Simply choose your level to get started.</li>
          <li><strong>Explore Topics:</strong> Based on your selected level, we present a range of topics for you to delve into. Each topic is carefully curated to enhance your learning experience.</li>
          <li><strong>Detailed Chapters:</strong> Click on a topic to reveal chapters that offer in-depth explanations. Our content is designed to be comprehensive, clear, and engaging.</li>
          <li><strong>Interactive Quizzes:</strong> After studying a chapter, test your knowledge with our automatically generated quizzes. These quizzes are based on the detailed explanations provided in the chapters.</li>
          <li><strong>Ask Doubts:</strong> Have questions or need further clarification? Use our doubt resolution feature to get answers from our AI tutor.</li>
        </ul>
        
        <h2>Features</h2>
        <ul>
          <li><strong>Personalized Learning Paths:</strong> Content tailored to your level of expertise.</li>
          <li><strong>In-Depth Explanations:</strong> Detailed chapters that cover topics thoroughly.</li>
          <li><strong>Interactive Quizzes:</strong> Custom quizzes to reinforce your learning.</li>
          <li><strong>Doubt Resolution:</strong> Get answers to your questions from our AI tutor.</li>
        </ul>
      </section>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <AnimatedTooltip items={people} />
      </div>

      <div className="feedback-form-container">
        <h2 className="feedback-title">Feel free to share your feedback</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            className="feedback-textarea"
            rows="4"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="feedback-submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
