module.exports = (sequelize, type) => {
	return sequelize.define(
		'Despachos',
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
			Direccion: {
				type: type.STRING(255),
				allowNull: false,
			},
			Departamento: {
				type: type.STRING(100),
				allowNull: false,
			},
			Ciudad: {
				type: type.STRING(100),
				allowNull: false,
			},
			Guia: {
				type: type.STRING(50),
				allowNull: true,
			},
			Transportadora: {
				type: type.STRING(100),
				allowNull: true,
			},
			GuiaRetorno: {
				type: type.STRING(50),
				allowNull: true,
			},
			TransportadoraRetorno: {
				type: type.STRING(100),
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
