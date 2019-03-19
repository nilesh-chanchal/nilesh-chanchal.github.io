const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');


const db = knex({    
          client: 'pg',
          connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: true,
        }     
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('It is working!');
    //res.json(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) } )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } )

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)} )

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})



app.listen(process.env.PORT || 3000, ()=>{
    console.log("App is running on port 3000");
})


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/