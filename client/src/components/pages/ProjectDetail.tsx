import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { createCost, createIncome, listCost, listIncome } from "../../api/ProjectsApi";

interface Cost {
	reason: string;
	amount: number;
}

interface Income {
	reason: string;
	amount: number;
}

export default function ProjectDetail() {
	const { project_id = "", project_name } = useParams();

	const form1 = useForm<Cost>();
	const form2 = useForm<Income>();

	// Para Los Costos
	const { mutate: mutateCost } = useMutation({
		mutationFn: createCost,
		onSuccess: () => {
			window.location.reload();
		},
	});

	const handleRegisterCost = (formData: Cost) => {
		const costData = { project_id: project_id, reason: formData.reason, amount: formData.amount };
		mutateCost(costData);
	};

	const { data: dataCost = [] } = useQuery<Cost[]>(["Costs", project_id], () => listCost(parseInt(project_id, 10)));

	const lista_Costos = dataCost.map((item, index) => (
		<li key={index}>
			{item.Reason} {item.Amount}
		</li>
	));
	// Para los Ingresos
	const { mutate: mutateIncome } = useMutation({
		mutationFn: createIncome,
		onSuccess: () => {
			window.location.reload();
		},
	});

	const handleRegisterIncome = (formData: Income) => {
		const incomeData = { project_id: project_id, reason: formData.reason, amount: formData.amount };
		mutateIncome(incomeData);
	};

	const { data: dataIncome = [] } = useQuery<Cost[]>(["Income", project_id], () =>
		listIncome(parseInt(project_id, 10))
	);

	const lista_Income = dataIncome.map((item, index) => (
		<li key={index}>
			{item.Reason} {item.Amount}
		</li>
	));

	return (
		<>
			<div>Project-Detail: {project_name}</div>
			<div>Listado de Costos</div>
			{lista_Costos}
			<div>Agregar Costo</div>
			<div>
				<form onSubmit={form1.handleSubmit(handleRegisterCost)}>
					<div>
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							placeholder="Cantidad del costo"
							{...form1.register("amount", {
								required: "El costo es obligatorio",
							})}
						/>
					</div>
					<div>
						<label htmlFor="reason">Razón</label>
						<select
							id="reason"
							{...form1.register("reason", {
								required: "La razón es obligatoria",
							})}
						>
							<option value="">Selecciona una razón</option>
							<option value="Sueldo">Sueldo</option>
							<option value="Arriendo">Arriendo</option>
							<option value="Varios">Varios</option>
						</select>
					</div>
					<button type="submit">Agregar Costo</button>
				</form>
			</div>
			<div>Listado de Ingresos</div>
			{lista_Income}
			<div>Agregar Ingreso</div>
			<div>
				<form onSubmit={form2.handleSubmit(handleRegisterIncome)}>
					<div>
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							placeholder="Cantidad del Ingreso"
							{...form2.register("amount", {
								required: "El Ingreso es obligatorio",
							})}
						/>
					</div>
					<div>
						<label htmlFor="reason2">Tipo de Ingreso</label>
						<select
							id="reason2"
							{...form2.register("reason", {
								required: "La razón es obligatoria",
							})}
						>
							<option value="">Selecciona una razón 2</option>
							<option value="Pago">Pago</option>
							<option value="Factura">Factura</option>
							<option value="Varios">Varios</option>
						</select>
					</div>
					<button type="submit">Agregar Ingreso</button>
				</form>
			</div>
		</>
	);
}
