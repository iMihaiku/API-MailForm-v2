import express from 'express';
const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  res.send('GET request to the homepage');
});

export default usersRouter;