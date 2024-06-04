import { useQuery } from "react-query";
import { getClients } from "../../api/ProjectsApi";
import { useNavigate } from "react-router-dom";

interface Client {
	Email: string;
	Name: string;
	Id: number;
}

export default function Clients() {
	const { data = [] } = useQuery<Client[]>({
		queryKey: "Clients",
		queryFn: getClients,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: Infinity,
	});

	const navigate = useNavigate();

	const handleButton = (client: Client) => {
		navigate(`/Projects/${client.Id}/${client.Name}/${client.Email}`);
	};

	const lista = data.map((item, index) => (
		<li key={index}>
			{item.Name} <button onClick={() => handleButton(item)}>Ver Proyectos</button>
		</li>
	));

	return (
		<>
			<div>{lista}</div>
		</>
	);
}
