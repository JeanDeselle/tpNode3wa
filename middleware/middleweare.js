import jwt from 'jsonwebtoken';
let { APP_SECRET: secret } = process.env;

export const auth = (req, res, next) => {
	const TOKEN = req.session.token;
	// console.log(req.session);
	if (TOKEN === undefined || TOKEN === 'null') {
		// res.status(404).json({ status: 404, msg: 'token not found' });
		res.redirect("/login")
	} else {
		jwt.verify(TOKEN, secret, (err, decoded) => {
			// console.log('DECODED', decoded);
			if (err) {
				res.redirect("/login")
			} else {
				next();
			}
		});
	}
};
