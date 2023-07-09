const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { Despachos } = require('../../Config/db');

const RequiredFields = [
	check('IdPedido', 'El id es obligatorio').not().isEmpty(),
	check('CedulaPedido', 'La cedula es obligatoria').not().isEmpty(),
	check('FechaPedido', 'La fecha es obligatoria').not().isEmpty(),
	check('Direccion', 'La direccion es obligatoria').not().isEmpty(),
	check('Departamento', 'El departamento es obligatorio').not().isEmpty(),
	check('Ciudad', 'La ciudad es obligatoria').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const despachos = await Despachos.findAll();
		res.json(despachos);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	async (req, res, next) => {
		try {
			const despachos = await Despachos.findAll({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
				},
			});
			res.json(despachos);
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
			const despacho = await Despachos.create(req.body);
			res.json(despacho);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	ValidationFields,
	async (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status('422').json({ errores: errors.array() });

			await Despachos.update(req.body, {
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
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
			await Despachos.destroy({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
				},
			});

			res.json({ success: 'Eliminacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
