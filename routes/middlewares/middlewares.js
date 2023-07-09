const jwt = require('jwt-simple');
const moment = require('moment');

/*const checkToken = (req, res) => {
	if (!req.headers['user-token']) {
		return res.json({ error: 'Debes incluir el user-token en la cabezera' });
	}

	const userToken = req.headers['user-token'];
	let payload = {};

	try {
		payload = jwt.decode(
			userToken,
			'Esta es la forma en la que puedo encriptar la informacion sin que se sepa'
		);
	} catch (error) {
		return res.json({ error: 'El token es incorrecto' });
	}

	if (payload.expiredAt < moment().unix()) {
		return res.json({ error: 'El token ha expirado' });
	}

	return payload;
};*/

const checkUser = (req, res, next) => {
	if (!req.headers['user-token']) {
		return res
			.status('400')
			.json({ error: 'Debes incluir el user-token en la cabezera' });
	}

	const userToken = req.headers['user-token'];
	let payload = {};

	try {
		payload = jwt.decode(
			userToken,
			'De esta forma cambiaran los tokens para que no hayan problemas'
		);
	} catch (error) {
		return res.json({ error: 'El token es incorrecto' });
	}

	if (payload.expiredAt < moment().unix()) {
		return res.json({ error: 'El token ha expirado' });
	}

	req.usuarioId = payload.usuarioId;
	console.log(payload.expiredAt);
	next();
};

const checkAdmin = (req, res, next) => {
	if (!req.headers['user-token']) {
		return res
			.status('400')
			.json({ error: 'Debes incluir el user-token en la cabezera' });
	}

	const userToken = req.headers['user-token'];
	let payload = {};

	try {
		payload = jwt.decode(
			userToken,
			'De esta forma cambiaran los tokens para que no hayan problemas'
		);
	} catch (error) {
		return res.status('498').json({ error: 'El token es incorrecto' });
	}

	if (payload.expiredAt < moment().unix()) {
		return res.json({ error: 'El token ha expirado' });
	}

	if (payload.usuarioTipo !== 'Administrador')
		return res.status('401').json({ error: 'Acceso Denegado' });

	req.usuarioId = payload.usuarioId;
	console.log(payload.expiredAt);
	next();
};

module.exports = { checkUser, checkAdmin };
