import type { Response, Request } from "express";
import Client from "../models/Client.model";
import Project from "../models/Project.model";
import Costs from "../models/Costs.model";
import Income from "../models/Income.model";

export class ProjectsController {
	static createClient = async (req: Request, res: Response) => {
		try {
			//console.log("Creando Cliente con", req.body);

			const client_exists = await Client.findOne({ where: { Email: req.body.email } });

			//console.log(client_exists);

			if (client_exists) {
				const error = new Error("Este Email ya se encuentra registrado");
				return res.status(409).json({ error: error.message });
			}

			const client = new Client();
			client.Name = req.body.name;
			client.Email = req.body.email;

			await Promise.allSettled([client.save()]);

			res.send("Cliente Registrado Correctamente");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static createProject = async (req: Request, res: Response) => {
		try {
			console.log("Creando Proyecto con", req.body);

			const client = await Client.findOne({ where: { Email: req.body.email } });
			const project = new Project();

			project.Client_Id = client.Id;
			project.Project_Name = req.body.project_name;

			await Promise.allSettled([project.save()]);
			res.send("Proyecto Registrado Correctamente");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static createCost = async (req: Request, res: Response) => {
		try {
			console.log("Creando Coste con", req.body);
			const cost = new Costs();
			cost.Project_Id = req.body.project_id;
			cost.Reason = req.body.reason;
			cost.Amount = req.body.amount;
			await Promise.allSettled([cost.save()]);
			res.send("Costo Creado Correctamente");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static createIncome = async (req: Request, res: Response) => {
		try {
			const income = new Income();
			income.Project_Id = req.body.project_id;
			income.Reason = req.body.reason;
			income.Amount = req.body.amount;
			await Promise.allSettled([income.save()]);
			res.send("Ingreso Creado Correctamente");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static listClients = async (req: Request, res: Response) => {
		try {
			const clients = await Client.findAll();
			res.send(clients);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static listProjects = async (req: Request, res: Response) => {
		try {
			const projects = await Project.findAll({ where: { Client_Id: req.params.clientID } });
			res.send(projects);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static listCosts = async (req: Request, res: Response) => {
		try {
			const costs = await Costs.findAll({ where: { Project_Id: req.params.project_id } });
			res.send(costs);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};

	static listIncomes = async (req: Request, res: Response) => {
		try {
			const incomes = await Income.findAll({ where: { Project_Id: req.params.project_id } });
			res.send(incomes);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Hubo un error" });
		}
	};
}
