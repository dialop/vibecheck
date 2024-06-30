const express = require('express');
const { Pool } = require('pg');
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

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
