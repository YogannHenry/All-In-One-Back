const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const toDoListRouter = require('./app.to-do-list/to-do-list.router/to-do-list.router.js');
const userRouter = require('./app.user/user.router.js')
const walletRouter = require('./app.wallet/wallet.router/wallet.router.js');
const app = express() ;
const port = process.env.PORT ?? 1665;

app.use(express.json());

app.use(userRouter)
app.use(toDoListRouter);
app.use(walletRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
