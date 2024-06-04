import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createProject, getProjects } from "../../api/ProjectsApi";
import { useState, ChangeEvent } from "react";

interface Project {
	Id: number;
	Project_Name: string;
}

export default function Projects() {
	const navigate = useNavigate();

	const { clientId = "", clientName, clientEmail } = useParams();

	const parsedClientId = parseInt(clientId, 10);

	const [inputValue, setInputValue] = useState("");
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const { mutate } = useMutation({
		mutationFn: createProject,
		onSuccess: () => {
			window.location.reload();
		},
	});

	const handleButtonClick = () => {
		mutate({ client_name: clientName, project_name: inputValue, email: clientEmail });
	};

	const { data = [] } = useQuery<Project[]>(["projects", clientId], () => getProjects(parsedClientId));

	const lista = data.map((item, index) => (
		<li key={index}>
			{item.Project_Name}{" "}
			<button onClick={() => navigate(`/project-detail/${item.Id}/${item.Project_Name}`)}>Detalle</button>
		</li>
	));

	return (
		<>
			<div>Bienvenido a los proyectso de {clientName}</div>
			<div>Listado de Proyectos</div>
			<div>{lista}</div>
			<div>
				Necesitas crear un nuevo proyecto, ingresa el nombre del proyecto{" "}
				<input type="text" value={inputValue} onChange={handleChange}></input>
				<button onClick={handleButtonClick}>Crear Proyecto</button>
			</div>
		</>
	);
}
