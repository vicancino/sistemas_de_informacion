import { Router } from "express";
import { ProjectsController } from "../controllers/Projects.Controller";
import { body } from "express-validator";
import { handleInputErros } from "../middleware";

const routerProjects = Router();

routerProjects.post(
	"/new-client",
	body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
	body("email").isEmail().withMessage("Correo no valido"),
	handleInputErros,
	ProjectsController.createClient
);

routerProjects.post(
	"/new-project",
	body("project_name").notEmpty().withMessage("El nombre del proyecto no puede ir vacio"),
	body("email"),
	handleInputErros,
	ProjectsController.createProject
);

routerProjects.post(
	"/new-cost",
	body("project_id"),
	body("reason"),
	body("amount"),
	handleInputErros,
	ProjectsController.createCost
);

routerProjects.post(
	"/new-income",
	body("project_id"),
	body("reason"),
	body("amount"),
	handleInputErros,
	ProjectsController.createIncome
);

routerProjects.get("/list-clients", ProjectsController.listClients);

routerProjects.get("/list-projects/:clientID", ProjectsController.listProjects);

routerProjects.get("/list-costs/:project_id", ProjectsController.listCosts);

routerProjects.get("/list-incomes/:project_id", body("project_id"), ProjectsController.listIncomes);

export default routerProjects;
