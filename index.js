const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const toDoListRouter = require('./app.to-do-list/to-do-list.router/to-do-list.router.js');
const userRouter = require('./app.session/session.router.js')
// const walletRouter = require('./app.wallet/wallet.router/wallet.router.js');
const app = express() ;
const port = process.env.PORT ?? 1665;


app.use(express.json());

app.use(userRouter)
app.use(toDoListRouter);
// app.use(walletRouter);

<<<<<<< HEAD

=======
>>>>>>> 91d9712ad8de10f4e9fa03bef3d3a3f20d6c9ee3
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
