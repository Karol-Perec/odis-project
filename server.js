const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established succesfully');
});

const userRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');
const userSessionRoutes = require('./routes/userSession');
const commentsRoutes = require('./routes/comments');

app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/userSession', userSessionRoutes);
app.use('/api/comments', commentsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
