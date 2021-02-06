const express = require('express');
const cors = require('cors');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//cors 
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');//Origin, X-Requested-With, Content-Type, Accept
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

//public images
app.use('/photos', express.static('uploads'));

// Routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port', 3000);