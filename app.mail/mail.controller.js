// controllers/contactController.js

// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'plume.o2switch.net',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@heyo5082.odns.fr',
    pass: 'O2switch82*!*',
  },
});

exports.sendContactEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const mailOptions = {
      from: 'contact@heyo5082.odns.fr',
      to: 'contact@heyo5082.odns.fr',
      subject: 'Nouveau message de contact',
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail envoyé avec succès' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail' });
  }
};
