const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const Sequelize = require('sequelize');
const { Pagos, Pedidos } = require('../../Config/db');

const RequiredFields = [
	check('IdPedido', 'El id es obligatorio').not().isEmpty(),
	check('CedulaPedido', 'La cedula del cliente es obligatoria').not().isEmpty(),
	check('FechaPedido', 'La fecha del pedido es obligatoria').not().isEmpty(),
	check('Nombre', 'El metodo de pago es obligatorio').not().isEmpty(),
	check('Valor', 'El valor pagado es obligatorio').not().isEmpty(),
	check('Medio', 'El medio es obligatorio').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const pagos = await Pagos.findAll();
		res.json(pagos);
	} catch (error) {
		next(error);
	}
});

router.get('/fecha/:fecha', async (req, res, next) => {
	try {
		const pagos = await Pagos.findAll({
			include: [Pedidos],
			where: Sequelize.literal(
				`Date(Pagos.FechaPago) = Date('${req.params.fecha}')`
			),
		});
		res.json(pagos);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/tipo/:tipoPago/medio/:medio/idPago/:idPagos',
	async (req, res, next) => {
		try {
			const pagos = await Pagos.findAll({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
					Nombre: req.params.tipoPago,
					Medio: req.params.medio,
					IdPagos: req.params.idPagos,
				},
			});
			res.json(pagos);
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
			fs.renameSync(
				req.file.path,
				req.file.path + '.' + req.file.mimetype.split('/')[1]
			);

			req.body.Foto = req.file.path + '.' + req.file.mimetype.split('/')[1];

			const pago = await Pagos.create(req.body);
			res.json(pago);
		} catch (error) {
			if (req.file)
				fs.unlinkSync(req.file.path + '.' + req.file.mimetype.split('/')[1]);
			next(error);
		}
	}
);

router.put(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/tipo/:tipoPago/medio/:medio/idPago/:idPagos',
	ValidationFields,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status('422').json({ errores: errors.array() });

		try {
			await Pagos.update(req.body, {
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
					Nombre: req.params.tipoPago,
					Medio: req.params.medio,
					IdPagos: req.params.idPagos,
				},
			});

			res.json({ success: 'Modificacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/tipo/:tipoPago/medio/:medio/idPago/:idPagos',
	async (req, res, next) => {
		try {
			await Pagos.destroy({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
					Nombre: req.params.tipoPago,
					Medio: req.params.medio,
					IdPagos: req.params.idPagos,
				},
			});

			res.json({ success: 'Eliminacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
