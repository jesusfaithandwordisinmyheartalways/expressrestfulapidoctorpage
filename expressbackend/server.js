



const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const userRateLimit = require('express-rate-limit')
const JSON_WEB_TOKEN = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express();

app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet())
app.use(cors({ origin:'http://localhost:9000', credentials: true }))


const userLimit = userRateLimit({
    windowMs: 15 * 60 * 1000,
    max:100,
    message: 'Limit is reached',
})
app.use(userLimit);

const SecretKey = 'mysecretkey';

const users = [];


const validateUser = ( username, password, email ) => {
        const username_Regex = /^[a-zA-Z0-9_]{3,16}$/;
        const password_Regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
        const email_Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return username_Regex.test(username) && password_Regex.test(password) && email_Regex.test(email)
}


app.post('/register', (req, res) => {
     const {username, password, confirmPassword, email } = req.body;
     if(!validateUser(username, password, email)) { return res.status(400).json({ error: 'Invalid Form Submission, Try Again'})};
     if(password !== confirmPassword) { return res.status(400).json({ error: 'Passwords do not match' })};
     const userLoginExist =  users.some(e => e.username === username || e.email === email);
     if(userLoginExist) { return res.status(400).json({ error: 'User login exist'})};
       const newUser = { username , password, email };
       users.push(newUser);
       const token =  JSON_WEB_TOKEN.sign({ username}, SecretKey, { expiresIn: '90d'});
       res.cookie('auth_token', token, {
         httpOnly:true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 90 * 24 * 60 * 60 * 1000,
       });
        res.status(200).json({ message: 'User has Registered', username, email })
  })



app.post('/login', (req, res) => {
     const { username , password,  email } = req.body;
      const user = users.find(e => e.username === username && e.email === email)
      if(!user || user.password !== password) { return res.status(400).json({ error: 'Invalid credentials'})};
      const token = JSON_WEB_TOKEN.sign({ username: user.username, email: user.email}, SecretKey, { expiresIn: '90d'});
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })
       res.status(200).json({ message:'User Logged In', username: user.username, email: user.email })
})


app.get('/profile', (req, res) => {
    const token = req.cookies.auth_token;
    if(!token) { return res.status(401).json({ error: 'Unauthorized'})};
    try {
        const decoded =  JSON_WEB_TOKEN.verify(token, SecretKey)
       const user = users.find(e => e.username === decoded.username)
       if(!user) { return res.status(404).json({ error: 'User not found'})}
       res.json({ username: user.username, email: user.email })
    }catch(error) {
        res.status(401).json({ error: 'Unauthorized'})
    }
});



app.put('/profile', (req, res) => {
     const { username, password, confirmPassword, email } = req.body;
     const token = req.cookies.auth_token;
     if(!token) { return res.status(401).json({ error: 'Unauthorized'})};
     if(password !== confirmPassword) { return res.status(400).json({ error: 'Passwords do not match'})}
     try {
          const decoded =  JSON_WEB_TOKEN.verify(token, SecretKey);
          const user = users.find(e => e.username === decoded.username);
          if(!user) { return res.status(401).json({ error: 'User not found'})};
          if(validateUser(username, password, email)){
            user.username = username;
            user.password = password;
            user.email = email;
            res.status(200).json({ message: 'Profile Updated Successfully', username, email })
          } else {
                return res.status(400).json({ error: 'Invalid Credentials' })
          }
        }catch(error) {
            res.status(401).json({ error: 'Unauthorized'})
     }
});



app.delete('/profile', (req, res)  => {
       const token = req.cookies.token;
       if(!token) { return res.status(401).json({ error: 'Unauthorized'})};
       try {
           const decoded = JSON_WEB_TOKEN.verify(token, SecretKey);
           const userIndex = users.findIndex(e => e.username === decoded.username);
           if(userIndex === -1) { return res.status(404).json({ error: 'User not found'})};

           users.splice(userIndex, 1);
           res.clearCookie('authentication token');
           res.status(200).json({message: 'User profile deleted'})
       }catch(error) {
            res.status(401).json({ error: 'Unauthorized'})
       }
});



const PORT = 9001;
app.listen(PORT, () => {
    console.log(`Server is live on: ${PORT}`)
})