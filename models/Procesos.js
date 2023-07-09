module.exports = (sequelize, type) => {
	return sequelize.define(
		'Procesos',
		{
			Id: {
				type: type.INTEGER,
				allowNull: false,
				primaryKey: true,
				unique: false,
				references: {
					model: 'Pedidos',
					key: 'Id',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			CedulaCliente: {
				type: type.STRING(15),
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'Pedidos',
					key: 'CedulaCliente',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			Fecha: {
				type: type.DATE,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'Pedidos',
					key: 'Fecha',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			Tipo: {
				type: type.STRING(35),
				allowNull: false,
			},
			Contexto: {
				type: type.STRING(255),
				allowNull: false,
			},
			FechaProceso: {
				type: type.DATE,
				allowNull: false,
				primaryKey: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
