import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { newClient } from "../../api/ProjectsApi";
import { ToastContainer } from "react-toastify";

export default function Home() {
	const { register, handleSubmit, reset } = useForm();

	const { mutate } = useMutation({
		mutationFn: newClient,
		onSuccess: () => {
			reset();
		},
	});

	const handleRegister = (formData: Object) => {
		console.log(formData);
		mutate(formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleRegister)} noValidate>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						{...register("email", {
							required: "El Email de registro es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
				</div>

				<div>
					<label>Nombre</label>
					<input
						type="name"
						placeholder="Nombre de Registro"
						{...register("name", {
							required: "El Nombre de usuario es obligatorio",
						})}
					/>
				</div>
				<input type="submit" value="Registrar Nuevo cliente" />
			</form>

			<ToastContainer />
		</>
	);
}
