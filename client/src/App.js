import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = async () => {
      try {
          const response = await axios.post('https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english', {
              inputs: text
          }, {
              headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`
              }
          });
          setSentiment(response.data);
      } catch (error) {
          console.error('Error analyzing sentiment:', error);
      }
  };


    return (
        <div className="App">
            <header className="App-header">
                <h1>Sentiment Analysis</h1>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text here"></textarea>
                <button onClick={analyzeSentiment}>Analyze Sentiment</button>
                {sentiment && (
                    <div>
                        <h2>Sentiment Analysis Result:</h2>
                        <pre>{JSON.stringify(sentiment, null, 2)}</pre>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;