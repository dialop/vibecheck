import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
        return;
    }

    setError(null);
    setLoading(true);


    console.log('Button clicked');
    
    try {
        const response = await axios.post('http://localhost:5000/analyze', { text });
        console.log('Response received:', response.data);
        setSentiment(response.data);
    } catch (error) {
        console.error('Error analyzing sentiment:', error.response ? error.response.data : error.message);
        setError('Error analyzing sentiment');
    } finally {
        setLoading(false);
    }
};

const clearInput = () => {
    setText('');
    setSentiment(null);
    setError(null);
};



return (
    <div className="App">
        <header className="App-header">
            <h1 className="text-3xl font-bold underline">Sentiment Analysis</h1>
            <textarea
                className="mt-4 p-2 border text-black border-gray-300 rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here"
            ></textarea>
            <div className="mt-4">
                <button
                    className="mr-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={analyzeSentiment}
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze Sentiment'}
                </button>
                <button
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                    onClick={clearInput}
                >
                    Clear
                </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {sentiment && (
                <div className="mt-4">
                    <h2 className="text-2xl">Sentiment Analysis Result:</h2>
                    <pre>{JSON.stringify(sentiment, null, 2)}</pre>
                </div>
            )}
        </header>
    </div>
);
}

export default App;