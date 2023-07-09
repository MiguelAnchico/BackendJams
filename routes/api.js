const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/img' });

const middleware = require('./middlewares/middlewares');

const apiLoginRouter = require('./api/Login');
const apiPedidosRouter = require('./api/Pedidos');
const apiRegisterRouter = require('./api/Register');
const apiDespachosRouter = require('./api/Despachos');
const apiDomiciliosRouter = require('./api/Domicilios');
const apiRecogenRouter = require('./api/Recogen');
const apiMetodosPagosRouter = require('./api/MetodosPagos');
const apiPagosRouter = require('./api/Pagos');
const apiProductosRouter = require('./api/Productos');
const apiProcesosRouter = require('./api/Procesos');
const apiMessageRouter = require('./api/Message');

router.use('/login', apiLoginRouter);
router.use('/register', middleware.checkAdmin, apiRegisterRouter);
router.use('/pedidos', middleware.checkUser, apiPedidosRouter);
router.use('/despachos', middleware.checkUser, apiDespachosRouter);
router.use('/domicilios', middleware.checkUser, apiDomiciliosRouter);
router.use('/recogen', middleware.checkUser, apiRecogenRouter);
router.use('/metodos', middleware.checkAdmin, apiMetodosPagosRouter);
router.use(
	'/pagos',
	middleware.checkUser,
	upload.single('imagen'),
	apiPagosRouter
);
router.use(
	'/productos',
	middleware.checkUser,
	upload.single('imagen'),
	apiProductosRouter
);

router.use('/procesos', middleware.checkUser, apiProcesosRouter);
router.use('/message', middleware.checkUser, apiMessageRouter);

module.exports = router;
