const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { YoutubeGrabTool, YoutubeTranscriptError } = require('./dist/YoutubeGrabTool.js');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const app = express();
app.use(cors());
 
const getSummary = async (req, res) => {
    try {
      // Get the transcript of the video using YoutubeGrabTool
      const transcriptChunks = await YoutubeGrabTool.fetchTranscript(req.query.videoId);
  
      // Combine the transcript text from all chunks
      const transcriptList = transcriptChunks.map(item => item.text);
      const transcript = transcriptList.join(' ');
  
      // Get the summary using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
      const prompt = `Summarize the following text, with bullet points in 150 words: ${transcript}`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      // Return the summary
      res.json({ data: text, error: false });
    } catch (error) {
      // Handle errors gracefully
      console.error(error);
      if (error instanceof YoutubeTranscriptError) {
        res.json({ data: error.message, error: true });
      } else {
        res.json({ data: 'Unable to summarize the video', error: true });
      }
    }
  };

module.exports = getSummary;
  