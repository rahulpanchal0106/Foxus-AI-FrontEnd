import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layer0Card from '../../components/layer0Card/Layer0Card'
import styles from './layer0.module.css'
import Cookies from 'js-cookies'

const Layer0 = () => {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  const getLayer0Result = async () => {
    setLoading(true)
    if (prompt.trim() === '') {
      setError('Please enter a prompt.')
      setLoading(false)
      return
    }

    try {
      const token = Cookies.getItem('token')
      const response = await fetch('http://localhost:3000/layer0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
      setLoading(false)
    }
  }

  const checkTokenAndNavigate = () => {
    const token = Cookies.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      getLayer0Result()
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
        onClick={checkTokenAndNavigate}
        disabled={loading}
        className={styles.btn}
      >
        {loading ? (
          <img src="/search.gif" alt="" className={styles.icon} />
        ) : (
          <img src="/search.png" alt="" className={styles.icon} />
        )}
      </button>

      {error && <p>{error}</p>}
      {result && (
        <div>
          {Array.isArray(result) ? (
            result.map((level, index) => (
              <Layer0Card
                index={index}
                levelName={level.levelName}
                levelContent={level.levelContent}
                subject={level.subject}
                key={index}
              />
            ))
          ) : (
            <p>{result.result}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Layer0
