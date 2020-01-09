const express = require('express')
const router = express.Router();
const data = require('./data');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function (app) {
    app.post('/login', (req, res) => {
        if (req.body) {
            const login = req.body.login;
            const pass = req.body.pass;
            const found = data.users.find(user => user.login === login);
            const hash = crypto.createHash('md5').update(pass).digest("hex");
            if (found && found.password === hash) {
                const token = jwt.sign({ user: found }, config.privateKey);
                res.json({ "token": token, "role": found.role });
            } else {
                res.send('Bad login or password.');
            }
        }
    });

    app.get('/usersList', router, (req, res) => {
        const users = data.users.map(u => { return { id: u.id, name: u.name, role: u.role } });
        res.json(users);
    });

    app.post('/user/:id', router, (req, res) => {
        if (req.logedUser.role === 'admin') {
            const id = req.params.id;
            const user = data.users.find(u => u.id == id);
            const { name, role } = req.body;
            Object.assign(user, { name, role });
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    });
}

router.use(function (req, res, next) {
    if (req.headers['token']) {
        const token = req.headers['token'];
        const verify = jwt.verify(token, config.privateKey, function (err, decoded) {
            if (err) {
                res.sendStatus(401);
            } else {
                req.logedUser = decoded.user;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
})