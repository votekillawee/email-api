// emails.js - API to collect emails

const cors = require('cors');
const { sql } = require('./db.js');

const getEmailsPassword = process.env.GET_EMAILS_PASSWORD;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200
};
const emailRegExp = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@" +
  "[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);

async function handleSubmit(req, res) {
  try {
    if (!req.body.email.match(emailRegExp))
      throw new Error(`Invalid email: ${req.body.email}`);

    await sql`
      INSERT INTO emails(email, name)
      VALUES (${req.body.email}, ${req.body.name})
    `;

    console.log(
      `/emails/submit (Info): Inserted ${req.body.name} (${req.body.email})`
    );

    res.status(200).send('OK');
  } catch (error) {
    console.log(`/emails/submit (Error): ${error.message}`);
    res.status(400).send('Bad Request');
  }
}

async function getEmails(req, res) {
  try {
    // the password must be correct to get emails
    if (req.query.password !== getEmailsPassword) {
      res.status(401).send('Unauthorized');
    } else {
      const emails = await sql`SELECT email, name FROM emails`;
      res.status(200).send(emails);
    }
  } catch (error) {
    console.log(`/emails (Error): ${error.message}`);
    res.status(501).send('Error');
  }
}

function configureRoutes(app) {
  app.post('/emails/submit', cors(corsOptions), handleSubmit);
  app.get('/emails', getEmails);
}

module.exports = { configureRoutes };
