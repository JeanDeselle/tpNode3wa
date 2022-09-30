import express from 'express';
import 'dotenv/config';
import router from './routes/router.js';
import mongoose from 'mongoose';
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";
// import flash from "connect-flash";

const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;
const URLPORT = `http://${hostname}:${port}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/public')));
app.use(
	session({
		name: 'simple',
		secret: 'simple',
		resave: false,
		saveUninitialized: true,
	})
);
// app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

mongoose
	.connect('mongodb://localhost:27017/users', {
		useNewUrlParser: true,
	})
	.then(() => app.listen(port, () => console.log(`Listening at ${URLPORT}`)));


