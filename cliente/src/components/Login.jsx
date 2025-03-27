import { useState } from "react";
import Cookies from "universal-cookie";
import Axios from "axios";

export const Login = ({ setIsAuth }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const cookies = new Cookies();

	const login = () => {
		Axios.post("http://localhost:3001/login", {
			username,
			password,
		}).then((res) => {
			const { firstName, lastName, username, token, userId } = res.data;
			cookies.set("token", token);
			cookies.set("userId", userId);
			cookies.set("username", username);
			cookies.set("firstName", firstName);
			cookies.set("lastName", lastName);
			setIsAuth(true);
		});
	};
	return (
		<div className="login">
			<label>Iniciar Sesión</label>
			<input 
				type="text" 
				placeholder="Nombre de usuario" 
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<input 
				type="password" 
				placeholder="Contraseña" 
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>

			<button onClick={login}>Iniciar Sesión</button>
		</div>
	);
};