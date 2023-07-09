const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const { Productos } = require('../../Config/db');

const RequiredFields = [
	check('IdPedido', 'El id es obligatorio').not().isEmpty(),
	check('CedulaPedido', 'La cedula del cliente es obligatoria').not().isEmpty(),
	check('FechaPedido', 'La fecha del pedido es obligatoria').not().isEmpty(),
	check('CodigoProducto', 'El codigo es obligatorio').not().isEmpty(),
	check('NombreProducto', 'El nombre del producto es obligatorio')
		.not()
		.isEmpty(),
	check('Valor', 'El valor del producto es obligatorio').not().isEmpty(),
	check('Medida', 'La medida es obligatoria').not().isEmpty(),
	check('Color', 'El color es obligatorio').not().isEmpty(),
	check('Cantidad', 'La cantidad es obligatoria').not().isEmpty(),
	check('Estado', 'El estado es obligatorio').not().isEmpty(),
];

const ValidationFields = [];

router.get('/', async (req, res, next) => {
	try {
		const productos = await Productos.findAll();
		res.json(productos);
	} catch (error) {
		next(error);
	}
});

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/codigo/:codigoProducto/medida/:medida/color/:color/idProducto/:idProducto',
	async (req, res, next) => {
		try {
			const productos = await Productos.findAll({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
					CodigoProducto: req.params.codigoProducto,
					Medida: req.params.medida,
					Color: req.params.color,
					IdProducto: req.params.idProducto,
				},
			});
			res.json(productos);
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

			const producto = await Productos.create(req.body);
			res.json(producto);
		} catch (error) {
			if (req.file)
				fs.unlinkSync(req.file.path + '.' + req.file.mimetype.split('/')[1]);
			next(error);
		}
	}
);

router.put(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/codigo/:codigoProducto/medida/:medida/color/:color/idProducto/:idProducto',
	ValidationFields,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status('422').json({ errores: errors.array() });

		let route;
		if (req?.file) {
			try {
				if (!req.body.urlImage) {
					fs.renameSync(
						req.file.path,
						req.file.path + '.' + req.file.mimetype.split('/')[1]
					);
					req.body.Foto = req.file.path + '.' + req.file.mimetype.split('/')[1];
				} else {
					req.body.Foto = req.body.urlImage;
				}

				route = req.body.Foto;
				console.log(route);
			} catch (error) {
				fs.unlinkSync(req.file.path + '.' + req.file.mimetype.split('/')[1]);
				res.json({ errores: error });
			}
		}

		try {
			await Productos.update(req.body, {
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
					CodigoProducto: req.params.codigoProducto,
					Medida: req.params.medida,
					Color: req.params.color,
					IdProducto: req.params.idProducto,
				},
			});

			res.json({ success: 'Modificacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha/codigo/:codigoProducto/medida/:medida/color/:color/idProducto/:idProducto',
	async (req, res, next) => {
		try {
			await Productos.destroy({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
					CodigoProducto: req.params.codigoProducto,
					Medida: req.params.medida,
					Color: req.params.color,
					IdProducto: req.params.idProducto,
				},
			});

			res.json({ success: 'Eliminacion completada' });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
