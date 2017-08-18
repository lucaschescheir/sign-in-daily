const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');

const server = express();

server.use(express.static('./public'))

const users = [
  {username: 'Lucas C', password: 'abc', logins: 0},
  {username: 'Chad', password:'express', logins: 0},
  {username: 'Chris', password:'apple', logins: 0},
  {username: 'MiYung', password: 'houston', logins: 0},
  {username: 'Michelle', password: 'dev', logins: 0}
];
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

server.engine('mustache', mustache());
server.set('views', './public');
server.set('view engine', 'mustache');

server.use(bodyparser.urlencoded({ extended: false }));

server.get('/', function(req, res){
  res.render('home');
  });

server.get('/login', function(req, res) {
      if(req.session.who !== undefined) {
    res.render('login', {
options: req.session.who,
 //options: req.sessions.who.
    });
   } else {
     res.redirect('/')
   }

    // if(req.session.who == undefined){
    //   res.redirect('/')
    // } else {
  });

server.post('/signin', function(req, res) {
  req.session
   const username = req.body.username;
   const password = req.body.password;

   let user = null;

   for(let i = 0; i < users.length; i++){
    if(username === users[i].username &&
    password === users[i].password) {
       user = users[i];
   }
 }
 if(user !== null){
    req.session.who = user,
    req.session.who.logins++;
   res.redirect('/login')
 } else {
  res.redirect('/')
}
});
server.listen('3003', function(){
  console.log('hello');
})

server.post('/', function(req, res) {
  res.redirect("/")
});
