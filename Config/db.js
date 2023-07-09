const Sequelize = require('sequelize');
const UsuariosModel = require('../models/Usuarios');
const PedidosModel = require('../models/Pedidos');
const DespachosModel = require('../models/Despachos');
const DomiciliosModel = require('../models/Domicilios');
const RecogenModel = require('../models/Recogen');
const MetodosPagosModel = require('../models/MetodosPagos');
const PagosModel = require('../models/Pagos');
const ProductosModel = require('../models/Productos');
const ProcesosModel = require('../models/Procesos');
const MessageModel = require('../models/Message');

Config = require('./config');

const sequelize = new Sequelize(
	Config.DB_NAME,
	Config.DB_USER,
	Config.DB_PASSWORD,
	{
		host: Config.DB_HOST,
		dialect: 'mysql',
	}
);

const Usuarios = UsuariosModel(sequelize, Sequelize);
const Pedidos = PedidosModel(sequelize, Sequelize);
const Despachos = DespachosModel(sequelize, Sequelize);
const Domicilios = DomiciliosModel(sequelize, Sequelize);
const Recogen = RecogenModel(sequelize, Sequelize);
const MetodosPagos = MetodosPagosModel(sequelize, Sequelize);
const Pagos = PagosModel(sequelize, Sequelize);
const Productos = ProductosModel(sequelize, Sequelize);
const Procesos = ProcesosModel(sequelize, Sequelize);
const Message = MessageModel(sequelize, Sequelize);

module.exports = {
	Usuarios,
	Pedidos,
	Despachos,
	Domicilios,
	Recogen,
	MetodosPagos,
	Pagos,
	Productos,
	Procesos,
	Message,
};

require('./Relations');
