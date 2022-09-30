import { getUserByFilter, addUser } from '../models/UserModel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

dotenv.config();

let { APP_SALTROUNDS: saltRound, APP_SECRET: secret } = process.env;
saltRound = parseInt(saltRound);

export const getHomePage = (req, res) => {
	res.render('index', { template: 'home' });
};

export const postAddUser = async (req, res) => {
	const { fname, lname, email } = req.body;
	const salt = bcrypt.genSaltSync(saltRound);
	const psw = bcrypt.hashSync(req.body.psw, salt);

	if (!validator.isEmail(email)) {
		return res.json({ error: 'not an email', field: 'email' });
	}

	if (!validator.isAlpha(fname)) {
		return res.json({
			error: 'firstname is not valid',
			field: 'firstname',
		});
	}

	if (!validator.isAlpha(lname)) {
		return res.json({ error: 'lastname is not valid', field: 'lastname' });
	}

	const userExist =
		(await getUserByFilter({ email }).length) > 0 ? true : false;

	if (userExist) {
		return res.json({ error: 'This user already exist' });
	}
	addUser({
		firstName: fname,
		lastName: lname,
		email: email,
		password: psw,
	});
	res.redirect('/login');
};

export const getLoginPage = async (req, res) => {
	const [error] = req.flash('error');
	res.render('index', { template: 'login', error: error });
};

export const getDashDoardPage = (req, res) => {
	res.render('index', { template: 'dashboard' });
};

export const postLoginUser = async (req, res) => {
	const { email, psw } = req.body;

	const result = await getUserByFilter({ email: email });
	const [user] = result;
	if (result.length <= 0) {
		// return res.render('index', {
		// 	template: 'login',
		// 	error: req.flash('error', 'user not found'),
		// });
		// console.log('user not found');
		req.flash('error', 'user not found');
		return res.redirect('/login');
	}
	console.log(user);
	const isValidPsw = bcrypt.compareSync(psw, user.password);
	if (isValidPsw) {
		req.session.token = jwt.sign(
			{
				email: user.email,
			},
			secret,
			{
				expiresIn: '5h',
			}
		);
		req.session.user = user;
		res.redirect('/dashboard');
	} else {
		// return res.render('index', {
		// 	template: 'login',
		// 	error: 'bad password',
		// });
		req.flash('error', 'incorrect password');
		return res.redirect('/login');
	}
};
