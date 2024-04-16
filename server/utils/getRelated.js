const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const getRelatedVideos = async (req, res) => {
  try {
    const { videoId } = req.query; // Extract videoId from the request query parameters

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        relatedToVideoId: videoId,
        part: 'id,snippet',
        type: 'video',
        maxResults: '10'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST
      }
    };

    const response = await axios.request(options);
    const relatedVideos = response.data.items;

    res.json(relatedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getRelatedVideos;
