module.exports = (sequelize, type) => {
	return sequelize.define(
		'MetodosPagos',
		{
			Nombre: {
				type: type.STRING(30),
				allowNull: false,
				primaryKey: true,
				validate: {
					isIn: [
						['Transferencia', 'Consignacion', 'Wompi', 'Tarjeta', 'Cartera'],
					],
				},
			},
		},
		{
			timestamps: false,
		}
	);
};
