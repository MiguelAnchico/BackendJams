module.exports = (sequelize, type) => {
	return sequelize.define(
		'Pedidos',
		{
			Id: {
				type: type.INTEGER,
				allowNull: false,
				primaryKey: true,
				auto_increment: true,
				unique: false,
			},
			NombreCliente: {
				type: type.STRING(50),
				allowNull: false,
				primaryKey: true,
			},
			CedulaCliente: {
				type: type.STRING(15),
				allowNull: false,
				primaryKey: true,
			},
			Fecha: {
				type: type.DATE,
				allowNull: false,
				primaryKey: true,
			},
			Whatsapp: {
				type: type.STRING(20),
				allowNull: false,
			},
			Correo: {
				type: type.STRING(255),
				allowNull: true,
			},
			Categoria: {
				type: type.STRING(25),
				allowNull: false,
			},
			Observaciones: {
				type: type.STRING(500),
				allowNull: true,
			},
			CostoEnvio: {
				type: type.DOUBLE,
				allowNull: false,
			},
			ComicionDroppi: {
				type: type.DOUBLE,
				allowNull: true,
			},
			Revision: { type: type.BOOLEAN, allowNull: false },
			Facturado: { type: type.BOOLEAN, allowNull: false },
			NumeroFactura: {
				type: type.STRING(25),
				allowNull: true,
			},
			Estado: {
				type: type.STRING(35),
				allowNull: false,
			},
			IdCreador: {
				type: type.INTEGER,
				allowNull: false,
				references: {
					model: 'Usuarios',
					key: 'Id',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
					// Options:
					// - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
					// - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
					// - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
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
			IdFacturero: {
				type: type.INTEGER,
				allowNull: true,
				references: {
					model: 'Usuarios',
					key: 'Id',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
					// Options:
					// - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
					// - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
					// - `Deferrable.NO T` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
				},
			},
			Facturero: {
				type: type.STRING(80),
				allowNull: true,
				references: {
					model: 'Usuarios',
					key: 'Nombre',
					deferrable: type.Deferrable.INITIALLY_IMMEDIATE,
				},
			},
			Tipo: {
				type: type.STRING(50),
				allowNull: false,
			},
			Corregir: {
				type: type.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			Apartado: {
				type: type.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			nroApartado: {
				type: type.STRING(20),
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);
};
