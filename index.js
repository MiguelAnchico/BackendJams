const cors = require('cors');
const express = require('express');
const Config = require('./Config/config');
const path = require('path');

require('./Config/db');

const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const app = express();

const errorMiddleware = require('./routes/middlewares/ErrorHandle');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use('/public/img/:imagePath', (req, res, next) => {
	try {
		let options = { root: path.join(__dirname) };

		res.sendFile('/public/img/' + req.params.imagePath, options);
	} catch (error) {
		next(error);
	}
});

app.use(errorMiddleware);

app.listen(Config.PORT, (err) => {
	if (err) return console.log(err);
});
