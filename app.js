const cookieSession = require('cookie-session')
const express = require('express');
const app = express();
const port = 8081;

app.use(cookieSession({
    name: 'user_session', // name of the cookie
    httpOnly: true,
    sameSite: 'strict',
    secret: 'sometext',
  }))
app.use(express.json())

app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`)
})

app.post('/login', (req, res) => {
    res.cookie(req.body.username);
    req.session.username = req.body.username;
    res.status(201).send();
})

app.get('/hello', (req, res) => {
    res.status(200).send(`Welcome ${req.session.username} !`);
})