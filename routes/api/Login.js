const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

const { Usuarios } = require('../../Config/db');

const RequiredFields = [
	check('Nombre', 'El nombre de usuario es obligatorio').not().isEmpty(),
	check('Pwd', 'La contraseña es obligatoria').not().isEmpty(),
	check('Tipo', 'El tipo es obligatorio').not().isEmpty(),
];

router.post('/', RequiredFields, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status('422').json({ errores: errors.array() });

	try {
		const usuario = await Usuarios.findOne({
			where: { Nombre: req.body.Nombre, Tipo: req.body.Tipo },
		});

		if (usuario) {
			const iguales = bcrypt.compareSync(req.body.Pwd, usuario.Pwd);

			if (iguales) {
				res.json({
					success: createToken(usuario),
					user: { Tipo: usuario.Tipo, Nombre: usuario.Nombre, Id: usuario.Id },
				});
			} else {
				res.json({ error: 'Error en el usuario y/o contraseña' });
			}
		} else {
			res.json({ error: 'Error en el usuario y/o contraseña' });
		}
	} catch (error) {
		next(error);
	}
});

const createToken = (usuario) => {
	const payload = {
		usuarioId: usuario.Id,
		usuarioTipo: usuario.Tipo,
		createdAt: moment().unix(),
		expiredAt: moment().add(120, 'minutes').unix(),
	};

	return jwt.encode(
		payload,
		'De esta forma cambiaran los tokens para que no hayan problemas'
	);
};

module.exports = router;
