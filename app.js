const express = require('express');
const app = express();
const path = require('path');

//static files
app.use(express.static('public'));

app.use(express.json());

//connect to database
const connectDB = require('./config/db');
connectDB();

//Template engine
// app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');

//Routes
const files = require('./routes/files')
app.use('/api/files', files);

const show = require('./routes/show');
app.use('/files', show);

const download = require('./routes/download');
app.use('/files/download', download);

//connect to port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
