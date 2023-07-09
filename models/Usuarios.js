module.exports = (sequelize, type) => {
	return sequelize.define(
		'Usuarios',
		{
			Id: {
				type: type.INTEGER,
				primaryKey: true,
				unique: true,
				autoIncrement: true,
				allowNull: false,
			},
			Nombre: {
				type: type.STRING(80),
				primaryKey: true,
				allowNull: false,
			},
			Pwd: {
				type: type.STRING(150),
				allowNull: false,
			},
			Tipo: {
				type: type.STRING(100),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
