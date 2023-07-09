const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { MetodosPagos } = require('../../Config/db');

const RequiredFields = [
	check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const metodos = await MetodosPagos.findAll();
		res.json(metodos);
	} catch (error) {
		next(error);
	}
});

router.get('/nombre/:nombre/', async (req, res, next) => {
	try {
		const metodos = await MetodosPagos.findAll({
			where: {
				Nombre: req.params.nombre,
			},
		});
		res.json(metodos);
	} catch (error) {
		next(error);
	}
});

router.post(
	'/',
	[...RequiredFields, ValidationFields],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status('422').json({ errores: errors.array() });

		try {
			const metodo = await MetodosPagos.create(req.body);
			res.json(metodo);
		} catch (error) {
			next(error);
		}
	}
);

router.put('/nombre/:nombre/', ValidationFields, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status('422').json({ errores: errors.array() });

	try {
		await MetodosPagos.update(req.body, {
			where: {
				Nombre: req.params.nombre,
			},
		});

		res.json({ success: 'Modificacion completada' });
	} catch (error) {
		next(error);
	}
});

router.delete('/nombre/:nombre/', async (req, res, next) => {
	try {
		await MetodosPagos.destroy({
			where: {
				Nombre: req.params.nombre,
			},
		});

		res.json({ success: 'Eliminacion completada' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
