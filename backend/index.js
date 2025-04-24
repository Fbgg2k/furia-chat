const express = require('express');  
const cors = require('cors');  
const OpenAI = require('openai');  
require('dotenv').config();  
const { getMatches } = require('./src/services/get-matches');
const { getPlayers } = require('./src/services/get-players');
const { getNews } = require('./src/services/get-news');  

const app = express();  
const port = process.env.PORT || 3001;  

app.use(cors());  
app.use(express.json());  

const apiKey = process.env.OPENAI_API_KEY;  
const openai = new OpenAI({apiKey});


app.post('/api/openai', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a CS:GO commentator for Furia, who knows all the players, matches and information about the team. You should always answer in brazilian portuguese.',
        },
        { role: 'user', content: message },
      ],
    });

    const aiResponse = response.choices[0].message.content;

    if (!aiResponse) {
      return res.status(500).json({ error: 'Could not get response from AI' });
    }

    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error getting AI response:', error);
    res.status(500).json({ error: 'Could not get response from AI' });
  }
});

app.get('/api/matches', async (req, res) => {
  try {
    const matches = await getMatches();
    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Could not fetch matches' });
  }
});

app.get('/api/players', async (req, res) => {
  try {
    const players = await getPlayers();
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Could not fetch players' });
  }
});

app.get('/api/news', async (req, res) => {
  try {
    const news = await getNews();
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Could not fetch news' });
  }
});




app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});