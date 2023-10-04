// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: 'plume.o2switch.net',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@heyo5082.odns.fr',
    pass: 'Allinone82*!*',
  },
});

const mailController = {
  sendContactEmail: async (req, res) => {
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
      res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail" });
    }
  },

  sendConfirmationInscriptionEmail: async (req, res) => {
    const { pseudo, email } = req.body;

    try {
      const handlebarOptions = {
        viewEngine: {
          extName: '.handlebars',
          partialsDir: path.resolve('./views/'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
        extName: '.handlebars',
      };

      transporter.use('Handlebars.compile', hbs(handlebarOptions));

      const mailOptions = {
        from: 'contact@heyo5082.odns.fr',
        template: 'email',
        to: `${email}`,
        subject: 'Bienvenue chez All-in-1.fr',
        context: {
          name: `${pseudo}`,
          email: `${email}`,
        },
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail" });
    }
  },
};

module.exports = mailController;
