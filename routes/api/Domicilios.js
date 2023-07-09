const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { Domicilios } = require('../../Config/db');

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
		const domicilios = await Domicilios.findAll();
		res.json(domicilios);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	async (req, res, next) => {
		try {
			const domicilios = await Domicilios.findAll({
				where: {
					Id: req.params.id,
					Cedula: req.params.cedulaCliente,
					Fecha: req.params.fecha,
				},
			});
			res.json(domicilios);
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
			const domicilio = await Domicilios.create(req.body);
			res.json(domicilio);
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

			await Domicilios.update(req.body, {
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
			await Domicilios.destroy({
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
