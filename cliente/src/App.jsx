import { useEffect, useState, useRef  } from "react";
import './App.css';
import Axios from "axios";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { JoinGame } from "./components/JoinGame";

function App() {
  const [api_key, setApi_Key] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const client = useRef(null);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.current.disconnectUser();
    setIsAuth(false);
  }
  
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    // Hacer la solicitud para obtener la API_KEY con Axios
    Axios.get("http://localhost:3001/api-keys")
      .then((res) => {
        setApi_Key(res.data.apiKey);
      })
      .catch((error) => {
        console.error("Error al obtener la API_KEY:", error);
      });
  }, []);

  useEffect(() => {
    if (api_key) {
      client.current = StreamChat.getInstance(api_key); // Actualizamos la referencia mutable

      if (token) {
        client.current.connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword")
          },
          token
        )
        .then(() => {
          setIsAuth(true);
        });
      }
    }
  }, [api_key]);
 
  return (
    <div className="App">
      {isAuth ? (
         <Chat client={client.current}>
          <JoinGame />
          <button onClick={logOut}> Cerrar sesión </button>
         </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App
