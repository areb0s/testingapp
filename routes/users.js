const passport = require('../config/passport');
const express = require('express');
const router = express.Router();
const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

const db = require('../config/db');

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/register',
		failureFlash: false
	})
);
router.post('/register', (req, res) => {
	hasher({password:req.body.userPW}, (err, pass, salt, hash) => {
		var user= {
			authID: 'local:'+req.body.userID,
			userID: req.body.userID,
			userPW: hash,
			salt: salt
		};
		var sql = 'INSERT INTO users SET ?';
		db.query(sql, user, (err, results) => {
			if(err){
				console.log(err);
				res.status(500);
			} else {
				req.login(user, (err) =>{
					req.session.save(() => {
						res.redirect('/');
					});
				});
			};
		});
	});
});
router.get('/register', (req, res) => {
	res.render('register', { title: 'Express' });
});
router.get('/login', (req, res) => {
	res.render('login', { title: 'Express' });
});
router.get('/logout', (req, res) => {
	req.logout();
	req.session.save(() => {
		res.redirect('/users/login');
	});
});
module.exports = router;