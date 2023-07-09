const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

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
		req.body.Pwd = bcrypt.hashSync(req.body.Pwd, 16);
		const usuario = await Usuarios.create(req.body);
		res.json(usuario);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
