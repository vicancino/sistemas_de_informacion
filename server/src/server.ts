import express from "express";
import db from "./config/db";
import routerProjects from "./routes/router.projects";

// Conectamos Base de Datos
async function connectDB() {
	try {
		await db.authenticate();
		db.sync();
	} catch (error) {
		console.log("Error al conectar DB");
	}
}

connectDB();

const server = express();
const cors = require("cors");
server.use(cors());
server.use(express.json());

server.use("/projects", routerProjects);

export default server;
