import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const FeedBack=()=>{
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const username = Cookies.get('username')

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
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="email"
            className="username-input hidden"
            placeholder="Enter your Email "
            value={username}
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
    )
}

export default FeedBack