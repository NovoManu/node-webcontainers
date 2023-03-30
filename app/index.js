import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`The application can be accessed at http://localhost:${port}, as it is now live.`);
});
