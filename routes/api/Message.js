const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { Message } = require('../../Config/db');

const RequiredFields = [
	check('IdPedido', 'El id del pedido es obligatorio').not().isEmpty(),
	check('CedulaPedido', 'La cedula del cliente es obligatoria').not().isEmpty(),
	check('FechaPedido', 'La fecha del pedido es obligatoria').not().isEmpty(),
	check('IdMessage', 'El id del mensaje es obligatorio').not().isEmpty(),
	check('Contenido', 'El contenido del mensaje es obligatorio').not().isEmpty(),
	check('Creador', 'El creador es obligatorio').not().isEmpty(),
	check('IdCreador', 'El id del creador es obligatorio').not().isEmpty(),
];

const ValidationFields = [];

router.get(
	'/id/:id/cedula/:cedulaCliente/fecha/:fecha',
	async (req, res, next) => {
		try {
			const Mensajes = await Message.findAll({
				where: {
					IdPedido: req.params.id,
					CedulaPedido: req.params.cedulaCliente,
					FechaPedido: req.params.fecha,
				},
			});
			res.json(Mensajes);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/', [...RequiredFields], async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status('422').json({ errores: errors.array() });

	try {
		const mensaje = await Message.create(req.body);
		res.json(mensaje);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
