var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var Post = require('./models/Post');

var app = express();

app.use(cors());
app.use(bodyParser.json());



require('./routes')(app);

//Configuration to mongodb
mongoose.connect('mongodb://localhost:27017/SocialMedia', 
    { useNewUrlParser: true }, 
        (err) => {
            console.log('connected to mongo');
});

//Start the backend program
var port = process.env.PORT || 5000;
app.listen(port, function (err) {
    if (err) throw err;
    else console.log('Server running on port', port);
})