const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { Recogen } = require('../../Config/db');

const RequiredFields = [
	check('Id', 'El id es obligatorio').not().isEmpty(),
	check('Cedula', 'La cedula es obligatoria').not().isEmpty(),
	check('Fecha', 'La fecha es obligatoria').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const recogen = await Recogen.findAll();
		res.json(recogen);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	async (req, res, next) => {
		try {
			const recogen = await Recogen.findAll({
				where: {
					Id: req.params.id,
					Cedula: req.params.cedulaCliente,
					Fecha: req.params.fecha,
				},
			});
			res.json(recogen);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	[...RequiredFields, ValidationFields],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status('422').json({ errores: errors.array() });

		try {
			const recogen = await Recogen.create(req.body);
			res.json(recogen);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	ValidationFields,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status('422').json({ errores: errors.array() });

		try {
			await Recogen.update(req.body, {
				where: {
					Id: req.params.id,
					Cedula: req.params.cedulaCliente,
					Fecha: req.params.fecha,
				},
			});

			res.json({ success: 'Modificacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	async (req, res, next) => {
		try {
			await Recogen.destroy({
				where: {
					Id: req.params.id,
					Cedula: req.params.cedulaCliente,
					Fecha: req.params.fecha,
				},
			});

			res.json({ success: 'Eliminacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
