const {
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
} = require('./db');

Pedidos.hasMany(Productos, {
	foreignKey: 'IdPedido',
});

Pedidos.hasOne(Domicilios, {
	foreignKey: 'IdPedido',
});
Pedidos.hasMany(Message, {
	foreignKey: 'IdPedido',
});

Pedidos.hasOne(Despachos, {
	foreignKey: 'IdPedido',
});

Pedidos.hasOne(Recogen, {
	foreignKey: 'Id',
});

Pedidos.hasMany(Pagos, {
	foreignKey: 'IdPedido',
});

Pagos.hasOne(Pedidos, {
	foreignKey: 'Id',
});

Pedidos.hasMany(Procesos, {
	foreignKey: 'Id',
});

Pedidos.hasMany(Usuarios, {
	foreignKey: 'Id',
});
