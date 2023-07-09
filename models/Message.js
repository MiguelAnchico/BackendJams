module.exports = (sequelize, type) => {
	return sequelize.define(
		'Messages',
		{
			IdPedido: {
				type: type.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			CedulaPedido: {
				type: type.STRING(15),
				allowNull: false,
				primaryKey: true,
			},
			FechaPedido: {
				type: type.DATE,
				allowNull: false,
				primaryKey: true,
			},
			FechaMensaje: {
				type: type.DATE,
				allowNull: false,
				primaryKey: true,
			},
			IdMessage: {
				type: type.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			Contenido: {
				type: type.STRING(1000),
				allowNull: false,
			},
			IdCreador: {
				type: type.INTEGER,
				allowNull: false,
				references: {
					model: 'Usuarios',
					key: 'Id',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			Creador: {
				type: type.STRING(80),
				allowNull: false,
				references: {
					model: 'Usuarios',
					key: 'Nombre',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
		},
		{
			timestamps: false,
		}
	);
};
