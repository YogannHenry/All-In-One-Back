// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

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
      const mailOptions = {
        from: 'contact@heyo5082.odns.fr',
        to: email, // Utilisez la variable 'email' pour définir le destinataire
        subject: 'Bienvenue chez All-in-1.fr',
        html: `
        <!DOCTYPE html>
        <html lang="fr">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>EmailConfirmationInscription</title>
            <style>
                body {
                    background-color: #aa0e1d;
                    text-align: center;
                    font-family: sans-serif;
                    margin: 0;
                    padding: 0;
                }
        
                table {
                    width: 100%;
                    height: 100%;
                    background-color: #ffffff;
                    border-collapse: collapse;
                    table-layout: fixed;
                }
        
                table td {
                    padding: 20px;
                    vertical-align: middle;
                    text-align: center;
                }
        
                h1 {
                    color: #aa0e1d;
                    font-size: 2rem;
                    font-weight: bold;
                }
        
                .buttonConnexion {         
          padding: 10px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          margin-bottom: 5rem;  
          font-size: 1.2rem;
          background-color: #fff;
          color: #244ed9;
          border: 1px solid #244ed9;
        }
        
        .buttonConnexion:hover {
        background-color: #aa0e1d;
          color: #fff;
          border: 1px solid #aa0e1d;
          transition: 0.5s;
        }
        
        .marginButton {
        
        margin: 4rem;
        }
        
                img {
                    width: 10rem;
                    height: 10rem;
                    margin: 1rem;
                }
            </style>
        </head>
        
        <body>
            <table>
                <tr>
                    <td>
                        <h1>Bienvenue chez All-in-1</h1>
                        <a href="https://imgbb.com/"><img src="https://i.ibb.co/wwfTgpq/logo-7-ciel-orange.png" alt="logo-7-ciel-orange" border="0" /></a>
                        <h2>Confirmation d'inscription</h2>
                        <p>Votre inscription est maintenant valide sur le site <strong>www.all-in-1.fr</strong></p>
                        <div class="marginButton">
                            <a class="buttonConnexion" href="https://all-in-1.fr/login">Se connecter</a>
                        </div>
                        <p>En vous remerciant de votre confiance</p>
                        <p>La team de All-in-1</p>
                        <h2>Informations de connexion</h2>
                        <ul>
                            <ol>Identifiant : <span>${pseudo}</span></li>
                            <ol>Email : <span>${email}</span></li>
                        </ul>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>
        
        
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'E-mail envoyé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail" });
    }
  },
};

module.exports = mailController;
