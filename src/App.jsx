import "./styles/theme.css";
import "./styles/global.css";
import { Manager } from "./components/Manager";
import { Cadastro } from "./components/Cadastro";
import { Login } from "./components/Login";

export default function App() {

  return (
    <>
      <Login />
      <Cadastro />
      <Manager />
    </>
  );
}