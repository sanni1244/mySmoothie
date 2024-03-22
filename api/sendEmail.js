// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { subject, name, orderName, price, message, myNumber } = req.body;
 
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
      <br/><br/>
      <h4>Your order is from ${name}</h4>
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

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email: ' + error.message); 
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
