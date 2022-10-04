const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const mongoose = require('mongoose');

// const User = require('./models/user');

const app = express();

const PORT = 3000;

// const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use(express.json());

// app.use('/admin', adminRoutes);
app.use(authRoutes);
app.use('/secret', protectedRoutes);

// mongoConnect.mongoConnect(() => {
//   app.listen(3000);
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Mongo instance connected.`);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
