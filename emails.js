// emails.js - API to collect emails

const cors = require('cors');
const { sql } = require('./db.js');

const getEmailsPassword = process.env.GET_EMAILS_PASSWORD;

const corsOptions = {
  origin: 'https://google.com',
  optionsSuccessStatus: 200
};

async function handleSubmit(req, res) {
  try {
    await sql`
      INSERT INTO emails(email, name)
      VALUES (${req.body.email}, ${req.body.name})
    `;
    console.log(
      `/emails/submit: Inserted ${req.body.name} (${req.body.email})`
    );
    res.status(200).send('OK');
  } catch (error) {
    console.log(`Error at /emails/submit: ${error.message}`);
    res.status(501).send('Error');
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
    console.log(`Error at /emails: ${error.message}`);
    res.status(501).send('Error');
  }
}

function configureRoutes(app) {
  app.post('/emails/submit', cors(corsOptions), handleSubmit);
  app.get('/emails', getEmails);
}

module.exports = { configureRoutes };
