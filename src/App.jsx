import "./styles/theme.css";
import "./styles/global.css";
import { Product } from "./components/Product";


export default function App() {
  return (
    <>
      <Product id={1} thumbnail="image1.jpg" brand="Brand A" titulo="Product A" preco={29.99} descricao="Description for Product A" />
      <Product id={2} thumbnail="image2.jpg" brand="Brand B" titulo="Product B" preco={39.99} descricao="Description for Product B" />
      <Product id={3} thumbnail="image3.jpg" brand="Brand C" titulo="Product C" preco={49.99} descricao="Description for Product C" />
    </>
  );
}
