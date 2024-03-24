const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
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

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email: ' + error.message });
  }
};
