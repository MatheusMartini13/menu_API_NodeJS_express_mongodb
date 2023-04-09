// 3rd partu modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// Variables
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0ofd72s.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

// app, req and express configuration
const app = express();
app.use(express.json());

// request control
app.use(cors());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, DELETE, PATCH, OPTION',
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTION') {
		return res.sendStatus(200);
	}
	next();
});

// Routes usage
app.use(categoryRoutes);
app.use(productRoutes);

//error handler
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({ message: message, data: data });
});

// connection with DB and server
mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(process.env.PORT);
	})
	.catch((err) => console.log(err));
