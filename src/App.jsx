import "./styles/theme.css";
import "./styles/global.css";
import { MyTextList } from "./components/MyTextList";
import { Main } from "./components/Main";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
