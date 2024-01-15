import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config()





const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/', async (req, res) => {
  try {
    // Access your API key as an environment variable (see "Set up your API key" above)
    
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).send({
      bot: text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})



app.listen(3000, () => console.log('AI server started on http://localhost:3000'))