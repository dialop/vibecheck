require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Express
const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors());
app.use(express.json());

//Endpoints
app.post('/analyze', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english', {
            inputs: text
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error analyzing sentiment:', error.response ? error.response.data : error.message);
        res.status(500).send('Error analyzing sentiment');
    }
});


//Server 
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
});