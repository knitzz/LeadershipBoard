import { getKey, getLeaders, getScore, setKeyValuePair, updatedScoreCard } from './redis/redisServer.js';

import express from  'express';

const app = express();

app.get('/updateScore/:userId/:score', async (req, res) => {
  await updatedScoreCard(req.params.userId, req.params.score);
  res.send('Successful response.');
});

app.get('/leaders/:count', async (req, res) => {
  const userArray = await getLeaders(req.params.count);
  res.send( userArray);
});

app.get('/rank/:userId', async (req, res) => {
  const {rank,score} = await getScore(req.params.userId);
  res.send( {rank: rank, score: score});
});

app.listen(3000, () => console.log('Example app is listening on port 3000'));

