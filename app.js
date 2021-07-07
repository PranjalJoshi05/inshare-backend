const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//static files
app.use(express.static('public'));

app.use(express.json());

//connect to database
const connectDB = require('./config/db');
connectDB();

//Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000']
}

app.use(cors(corsOptions));

//Template engine
// app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');

//Routes

app.get('/',(req,res){
  res.send('InShare backend');
});

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
