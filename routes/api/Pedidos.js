const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const Sequelize = require('sequelize');

const {
	Pedidos,
	Productos,
	Pagos,
	Procesos,
	Despachos,
	Recogen,
	Domicilios,
	Message,
} = require('../../Config/db');

const RequiredFields = [
	check('NombreCliente', 'El nombre del cliente es obligatorio')
		.not()
		.isEmpty(),
	check('CedulaCliente', 'La cedula del cliente es obligatoria')
		.not()
		.isEmpty(),
	check('Fecha', 'La fecha del pedido es obligatoria').not().isEmpty(),
	check('Whatsapp', 'El numero de whatsapp es obligatorio').not().isEmpty(),
	check('Categoria', 'La categoria es obligatoria').not().isEmpty(),
	check('CostoEnvio', 'El costo del envio es obligatorio').not().isEmpty(),
	check('Facturado', 'El estado de facturacion es obligatorio').not().isEmpty(),
	check('Estado', 'El estado es obligatoria').not().isEmpty(),
	check('IdCreador', 'La identificacion del creador es obligatoria')
		.not()
		.isEmpty(),
	check('Creador', 'El nombre del creador es obligatorio').not().isEmpty(),
	check('Tipo', 'El tipo de envio es obligatorio').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const pedidos = await Pedidos.findAll({
			include: [Productos, Pagos, Procesos, Domicilios],
			where: {
				Estado: { [Op.ne]: 'Cancelado' },
			},
		});

		res.json(pedidos);
	} catch (error) {
		next(error);
	}
});

router.get('/key/:key/value/:value', async (req, res, next) => {
	try {
		let filter = {};
		filter[req.params.key] = { [Op.like]: '%' + req.params.value + '%' };
		if (req.params.key == 'Fecha')
			filter = Sequelize.literal(
				`Date(Pedidos.Fecha) = Date('${req.params.value}')`
			);

		const pedidos = await Pedidos.findAll({
			include: [Productos, Pagos, Procesos, Domicilios],
			where: filter,
		});

		res.json(pedidos);
	} catch (error) {
		next(error);
	}
});

router.get('/finish', async (req, res, next) => {
	try {
		const pedidos = await Pedidos.findAll({
			include: [Productos, Pagos, Procesos, Domicilios],
			where: {
				Estado: { [Op.ne]: 'Completado' },
			},
		});

		res.json(pedidos);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	async (req, res, next) => {
		try {
			const pedidos = await Pedidos.findAll({
				where: {
					Id: req.params.id,
					CedulaCliente: req.params.cedulaCliente,
					Fecha: req.params.fecha,
				},
				include: [
					Productos,
					Pagos,
					Procesos,
					Despachos,
					Recogen,
					Domicilios,
					Message,
				],
			});
			res.json(sortedProcesos(pedidos));
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
			req.body.Id = generateUUID();
			const pedido = await Pedidos.create(req.body);
			res.json(pedido);
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
			await Pedidos.update(req.body, {
				where: {
					Id: req.params.id,
					CedulaCliente: req.params.cedulaCliente,
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
			await Pedidos.destroy({
				where: {
					Id: req.params.id,
					CedulaCliente: req.params.cedulaCliente,
					Fecha: req.params.fecha,
				},
			});

			res.json({ success: 'Eliminacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

const sortedProcesos = (array) => {
	let arraySorted = [];
	array?.map((item, index) => {
		arraySorted.push(item);
		arraySorted[index].Procesos = item?.Procesos.sort(
			(a, b) =>
				new Date(a.FechaProceso).getTime() - new Date(b.FechaProceso).getTime()
		);
	});

	return arraySorted;
};

function generateUUID() {
	let d = new Date().getTime();
	let id = '';

	let uuid = 'xyxy'.replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
	for (i = 0; i < 5; i++) {
		id += Math.floor(Math.random() * 9);
	}

	id += '-' + uuid;
	return id;
}

module.exports = router;
