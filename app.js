const express = require('express');
const session = require('express-session');
const routes = require('./routes/users.js');
const { hash } = require('./crypto/config');
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: hash,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});