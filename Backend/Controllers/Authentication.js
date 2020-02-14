var User = require('../models/User');
var Post = require('../models/Post');

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

exports.list = async (req, res) => {
    // var author = '5b6ab5a95c0a953dd441747d';
    // var author = req.params.id
    // console.log(' req.params.id = ',  author)

    try {
        var posts = await Post.find({ author: req.params.id });
        res.status(200).send(posts)
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}

function createSaveToken(user, res) {
    var payload = { subject: user._id }
    var token = jwt.encode(payload, 'secretString');
    res.status(200).send({ token: token });
}

exports.register = (req, res) => {

    var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        description: req.body.description
    });

    newUser.save((err, newUser) => {
        if (err) {
            res.status(401).send({ message: 'Error registering user' });
        }
        else {
            console.log('user saved successfully');
            createSaveToken(newUser, res);
        }
    });
}

exports.login = async (req, res) => {
    var loginData = req.body;

    var user = await User.findOne({ email: loginData.email });

    if (!user) {
        res.status(401).send({ message: 'No such email exists' });
    }
    else {
        bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
            if (!isMatch)
                res.status(401).send({ message: 'Password is invalid' });
            else {
                createSaveToken(user, res);
            }
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        var users = await User.find({}, '-__v -password');
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
};

exports.getProfile = async (req, res) => {

    try {
        var user = await User.findById(req.params.id, '-__v -password')
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
};

exports.postMessage = (req, res) => {

    var newPost = new Post({
        message: req.body.message,
        author: req.authorId
    });

    newPost.save((err, post) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: "saving post error" });
        }
        else {
            console.log('post saved successfully');
            res.sendStatus(200);
        }
    })
}