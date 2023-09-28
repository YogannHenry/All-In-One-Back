const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyparser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const toDoListRouter = require('./app.to-do-list/to-do-list.router/to-do-list.router');
const userRouter = require('./app.user/user.router');
const walletRouter = require('./app.wallet/wallet.router/wallet.router');
const cartoolRouter = require('./app.cartool/cartool.router');
const contactMailController = require('./app.mail/mail.router');

const app = express();

const port = process.env.PORT ?? 1665;

app.use(bodyparser.json());

app.use(express.json());
app.use(cors());

app.use(contactMailController);
app.use(userRouter);
app.use(toDoListRouter);
app.use(walletRouter);
app.use(cartoolRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
