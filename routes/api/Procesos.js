const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { Procesos } = require('../../Config/db');

const RequiredFields = [
	check('Tipo', 'El tipo de proceso es obligatorio').not().isEmpty(),
	check('CedulaCliente', 'La cedula del cliente es obligatoria')
		.not()
		.isEmpty(),
	check('Fecha', 'La fecha del pedido es obligatoria').not().isEmpty(),
	check('Id', 'El id es obligatorio').not().isEmpty(),
	check('FechaProceso', 'La fecha del proceso es obligatoria').not().isEmpty(),
	check('Contexto', 'El contexto es obligatorio').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const procesos = await Procesos.findAll();
		res.json(procesos);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/fechaProceso/:fechaProceso',
	async (req, res, next) => {
		try {
			const procesos = await Procesos.findAll({
				where: {
					Id: req.params.id,
					CedulaCliente: req.params.cedulaCliente,
					Fecha: req.params.fecha,
					FechaProceso: req.params.fechaProceso,
				},
			});
			res.json(organizateAscending(procesos));
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
			const proceso = await Procesos.create(req.body);
			res.json(proceso);
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/fechaProceso/:fechaProceso',
	async (req, res, next) => {
		try {
			await Procesos.update(req.body, {
				where: {
					Id: req.params.id,
					CedulaCliente: req.params.cedulaCliente,
					Fecha: req.params.fecha,
					FechaProceso: req.params.fechaProceso,
				},
			});

			res.json({ success: 'Modificacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/fechaProceso/:fechaProceso',
	async (req, res, next) => {
		try {
			await Procesos.destroy({
				where: {
					Id: req.params.id,
					CedulaCliente: req.params.cedulaCliente,
					Fecha: req.params.fecha,
					FechaProceso: req.params.fechaProceso,
				},
			});

			res.json({ success: 'Eliminacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

const organizateAscending = (array) => {
	return array?.sort(
		(a, b) => new Date(a.Fecha).getTime() < new Date(b.Fecha).getTime()
	);
};

module.exports = router;
