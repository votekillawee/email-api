const express = require('express');
const app = express();
const port = 5050;

function handleRoot(req, res) {
  res.send('Hello, world!');
}

app.get('/', handleRoot);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
})
