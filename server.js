const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
// const fetch = require('node-fetch');

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-corrugated-88495',
        port: 5432,
        user: 'postgres',
        password: 'freetown234',
        database: 'smartbrain'
    }
});

// db.select('*').from('users').then(data =>console.log(data));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000, () => {
    console.log(`app runs on port ${process.env.PORT}`)
});

// app.listen(3000, () => {
//     console.log('app runs on port 3000')
// });

app.get('/', (req, res) => {res.send('it is working')});
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));


// app.get('/passhash', (req, res) => {
//     const saltRounds = 10;
//     const myPlaintextPassword = 'drumsets';

//     bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//         res.send(hash);
//     });

// });

// app.get('/passcheck', (req, res) => {
//     const pass = 'drumsets'
//     const code = '$2b$10$b9EbnaQw29RShIG2QVZ8S.EsetxYXCS0kdXn3cvGMzr1iODbTRnCG'
//     if (bcrypt.compareSync(pass, code)) {
//         res.send('Checksout')
//     }
//     res.status(400).json('Unmatching')
    
// });

// bcrypt.compareSync(someOtherPlaintextPassword, hash);