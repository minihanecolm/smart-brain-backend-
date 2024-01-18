import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'
import register from './controllers/register.js';
import signin from './controllers/signIn.js';
import profile from './controllers/profile.js'
import image from './controllers/image.js';
import imageurl from './controllers/imageurl.js'



const db= knex({
        client: 'pg',
        connection: {
          connectionString : process.env.DATABASE_URL,
          ssl: {rejectUnauthorized: false},
          host : process.env.DATABASE_HOST,
          port: 5432, 
          user : process.env.DATABASE_USER,
          password : process.env.DATABASE_PW,
          database : process.env.DATABASE_DB
        },
        
});




const app = express();
app.use(express.json())
app.use(cors())



app.get('/',(req,res)=>{
	res.send('success')
})

app.post('/signin',(req, res)=>{
  signin(req, res, db, bcrypt)});


app.post('/register', (req, res) => {
  register(req, res, db, bcrypt);
});


app.get('/profile/:id',(req, res) => {
  profile(req, res, db);
});

app.put('/image', (req, res) => {
  image(req, res, db);
});

app.post('/imageurl', (req, res) =>{
	imageurl(req, res)
});

app.listen(3000, ()=>{
	console.log('appis running on port 3000');
})


// 
// -->res = this is working 
// signin--> post success/fail
// register--> post = user
// profile/:userid -->get= user 
// image--> put --> user 