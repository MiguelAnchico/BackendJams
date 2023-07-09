module.exports = (sequelize, type) => {
	return sequelize.define(
		'Productos',
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
			CodigoProducto: {
				type: type.STRING(40),
				allowNull: false,
				primaryKey: true,
			},
			IdProducto: {
				type: type.STRING(20),
				allowNull: false,
				primaryKey: true,
			},
			NombreProducto: {
				type: type.STRING(100),
				allowNull: false,
			},
			Valor: {
				type: type.DOUBLE,
				allowNull: false,
			},
			Cantidad: {
				type: type.INTEGER,
				allowNull: false,
			},
			Medida: {
				type: type.STRING(20),
				allowNull: false,
				primaryKey: true,
			},
			Color: {
				type: type.STRING(20),
				allowNull: false,
				primaryKey: true,
			},
			Foto: {
				type: type.STRING(2083),
				allowNull: false,
			},
			Estado: {
				type: type.STRING(50),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
