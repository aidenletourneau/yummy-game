import fetch from 'node-fetch'
import express from 'express'
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();

app.listen(process.env.PORT, () => {
  console.log('Listening');
});

// cors stuff that allows requests from the vercel frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/restaurants/:lon/:lat', async (req, res) => {
  try {
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${req.params.lat}&longitude=${req.params.lon}&term=restaurants&radius=40000&sort_by=best_match&limit=20`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.apiKey}`
      }
    });
    if (response.ok) {
      const json = await response.json();
      res.json(json);
    } else {
      res.status(response.status).json({error: "Failed to fetch data from Yelp API"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});
  }
});
