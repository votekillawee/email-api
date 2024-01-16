require('dotenv').config();
const emails = require('./emails');
const express = require('express');
const busboy = require('express-busboy');

const app = express();
busboy.extend(app); // for parsing form-data into req.body

const port = process.env.SERVER_PORT;

emails.configureRoutes(app);

app.use('/examples', express.static('examples'));

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
