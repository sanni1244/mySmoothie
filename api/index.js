const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

// Configure CORS to allow requests from specific origins
app.use(cors({
  origin: 'https://naijablends.vercel.app', // Allow requests from this origin
  methods: 'GET,PUT,POST,DELETE', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
}));

const PORT = process.env.PORT || 5000;

app.post('/api', (req, res) => {
  const { subject, name, orderName, price, message, myNumber } = req.body;

  if (!subject || !name || !orderName || !price || !message || !myNumber) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sanni.ope.0@gmail.com',
      pass: 'etlr mgmk lalf hwjm'
    }
  });

  const mailOptions = {
    from: 'sanni.ope.0@gmail.com',
    to: 'sanni.ope.0@gmail.com',
    subject: subject,
    html: `<h2>You have a new order 🥳🥳🥳</h2>
      <br/>
      <h4>Order from ${name}</h4>
      <p>Here is the order</p>
      <ul>
      <li> Order:  ${orderName} </li>
      <li> Price:  ${price} </li>
      </ul>
      <p><b>Comments</b></p>

      <p>${message}</p>

      Phone Number: <a href="tel:${myNumber}">${myNumber}</a>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
      res.header('Access-Control-Allow-Origin', '*');
      res.send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
