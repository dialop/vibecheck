import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
        console.error('Input text is empty');
        return;
    }

    console.log('Button clicked, analyzing sentiment...');
    try {
        const response = await axios.post('http://localhost:5000/analyze', { text });
        console.log('Response received:', response.data);
        setSentiment(response.data);
    } catch (error) {
        console.error('Error analyzing sentiment:', error.response ? error.response.data : error.message);
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