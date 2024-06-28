import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('http://localhost:5000/api/chat', { message });
    setResponses([...responses, { message, response: data.response }]);
    setMessage('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Mental Health Chatbot</h1>
        <div className="chat-box mb-4 p-4 border rounded overflow-y-scroll" style={{ height: '300px' }}>
          {responses.map((res, index) => (
            <div key={index} className="mb-2">
              <p><strong>You:</strong> {res.message}</p>
              <p><strong>Bot:</strong> {res.response}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type your message here..."
          />
          <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
