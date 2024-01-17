import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'
import register from './controllers/register.js';
import signin from './controllers/signin.js';
import profile from './controllers/profile.js'
import image from './controllers/image.js';
import imageurl from './controllers/imageurl.js'



const db= knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1', //localhost
          user : 'colmminihane', //add your user name for the database here
          port: 5432, // add your port number here
          password : '', //add your correct password in here
          database : 'smart-brain' //add your database name you created here
        },
         searchPath: ['smartbrain']
});




const app = express();
app.use(express.json())
app.use(cors())



app.get('/',(req,res)=>{
	res.send('success')
})

app.post('/signin',signIn(db, bcrypt));


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