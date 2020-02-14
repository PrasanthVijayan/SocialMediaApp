
var AuthenticationController = require('./Controllers/Authentication')
var jwt = require('jwt-simple');

function checkAuthenticated(req, res, next){
    if(!req.header('Authorisation')){
        res.status(401).send({message: 'Unauthorized. Missing auth header'})
    }
    else{
        var token = req.header('Authorisation').split(' ')[1];

        var payload = jwt.decode(token, 'secretString');
        if(!payload)
        {
            res.status(401).send({message: 'Unauthorized. Auth header invalid'})
        }
        else{
            req.authorId = payload.subject;
        }
    }
    next();
}

module.exports = function(route){    

    route.get('/posts/:id', AuthenticationController.list);
    
    route.post('/register', AuthenticationController.register);

    route.post('/login',AuthenticationController.login);

    route.get('/users', AuthenticationController.getUsers);

    route.get('/profile/:id', AuthenticationController.getProfile);

    route.post('/post', checkAuthenticated, AuthenticationController.postMessage)
}
