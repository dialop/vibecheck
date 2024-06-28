const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MessageSchema = new mongoose.Schema({
  user: String,
  message: String,
  response: String,
});

const Message = mongoose.model('Message', MessageSchema);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 150,
  });

  const chatResponse = response.data.choices[0].text.trim();

  const newMessage = new Message({
    user: 'User', // Replace with actual user identifier if available
    message,
    response: chatResponse,
  });

  await newMessage.save();

  res.json({ response: chatResponse });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
