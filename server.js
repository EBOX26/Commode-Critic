const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/search-places', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const apiKey = 'AIzaSyCncdS0ebHpMYDd5zH4IBqeftgX1EPNSQM';
  const apiEndpoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  const locationType = 'restroom';
  const query = `local restrooms in ${searchTerm}`;
  const apiUrl = `${apiEndpoint}?query=${encodeURIComponent(query)}&type=${locationType}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
