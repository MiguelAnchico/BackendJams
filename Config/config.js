const PORT = process.env.PORT || 8080;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'auxiliar';
const DB_PORT = process.env.DB_PORT || 4000;

module.exports = {
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	DB_NAME,
	PORT,
	DB_PORT,
};
