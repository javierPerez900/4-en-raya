import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

export const SignUp = ({ setIsAuth }) => {
	const cookies = new Cookies();
	const [user, setUser] = useState(null);

	const signUp = () => {
		Axios.post("http://localhost:3001/signup", user).then((res) => {
			const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
			cookies.set("token", token);
			cookies.set("userId", userId);
			cookies.set("username", username);
			cookies.set("firstName", firstName);
			cookies.set("lastName", lastName);
			cookies.set("hashedPassword", hashedPassword);
			setIsAuth(true);
		});
	};

	return (
		<div className="signUp">
			<label>Registrarse</label>
			<input 
				type="text" 
				placeholder="Primer nombre" 
				onChange={(event) => {
					setUser({...user, firstName: event.target.value})
				}}
			/>
			<input 
				type="text" 
				placeholder="Primer apellido" 
				onChange={(event) => {
					setUser({...user, lastName: event.target.value})
				}}
			/>
			<input  
				placeholder="Nombre de usuario" 
				onChange={(event) => {
					setUser({...user, username: event.target.value})
				}}
			/>
			<input 
				type="password" 
				placeholder="Contraseña" 
				onChange={(event) => {
					setUser({...user, password: event.target.value})
				}}
			/>
			<button onClick={signUp}>Registrarse</button>
		</div>
	);
};