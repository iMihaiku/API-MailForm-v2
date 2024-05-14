import express from 'express';
const messageRouter = express.Router();

messageRouter.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

export default messageRouter;