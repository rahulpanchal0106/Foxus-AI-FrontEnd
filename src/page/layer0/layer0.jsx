import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import Layer0Card from '../../components/layer0Card/Layer0Card'
import styles from './layer0.module.css'

const Layer0 = () => {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // const navigate = useNavigate();

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  // //handle click of layerCard
  // const navigateToLayer1 = (data) => {
  //   console.log("layer1");
  //   navigate('http://localhost:3000/layer1', { state: data });
  // };

  // const handleClick = (levelName, levelContent, subject) => {
  //   navigateToLayer1({ levelName, levelContent, subject });
  // };

  const getLayer0Result = async () => {
    // e.preventDefault();
    setLoading(true)
    if (prompt.trim() === '') {
      setError('Please enter a prompt.')
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('accessToken');
      console.log(token);
      const response = await fetch("http://localhost:3000/layer0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include token in Authorization header
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to get result from backend.')
      }

      const resultData = await response.json()
      setResult(resultData)
      setError(null)
    } catch (error) {
      console.error('Error:', error.message)
      setError('Failed to fetch result from backend.')
      setResult(null)
    } finally {
      setLoading(false) // Update loading state regardless of success or failure
    }
  }
  return (
    <div className={styles.container}>
      <h1>Layer 0 Component</h1>
      <input
        type="text"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter your prompt"
        className={styles.in}
      />
      <button
        onClick={getLayer0Result}
        disabled={loading}
        className={styles.btn}
      >
        {loading ? (
          <img src="/loading.gif" alt="" className={styles.icon} />
        ) : (
          
            <img src="/search.gif" alt="" className={styles.icon} />
          
        )}
      </button>

      {error && <p>{error}</p>}
      {result && (
        <div>
          {Array.isArray(result) ? ( // Check if result is an array
            result.map((level, index) => (
              //card for LAYER
              <Layer0Card
                index={index}
                levelName={level.levelName}
                levelContent={level.levelContent}
                subject={level.subject}
                key={index}
              />
            ))
          ) : (
            <p>{result.result}</p> // Display direct answer as a paragraph
          )}
        </div>
      )}
    </div>
  )
}

export default Layer0
