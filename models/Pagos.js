module.exports = (sequelize, type) => {
	return sequelize.define(
		'Pagos',
		{
			IdPedido: {
				type: type.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'Pedidos',
					key: 'Id',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			CedulaPedido: {
				type: type.STRING(15),
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'Pedidos',
					key: 'CedulaCliente',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			FechaPedido: {
				type: type.DATE,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'Pedidos',
					key: 'Fecha',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			Nombre: {
				type: type.STRING(30),
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'MetodosPagos',
					key: 'Nombre',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			FechaPago: {
				type: type.DATE,
				allowNull: true,
			},
			IdPagos: {
				type: type.STRING(20),
				allowNull: false,
				primaryKey: true,
			},
			Medio: {
				type: type.STRING(30),
				allowNull: false,
				primaryKey: true,
			},
			Valor: {
				type: type.DOUBLE,
				allowNull: false,
			},
			Foto: {
				type: type.STRING(2083),
				allowNull: false,
			},
			Confirmado: {
				type: type.BOOLEAN,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
