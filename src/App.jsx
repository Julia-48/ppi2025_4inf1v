import "./styles/theme.css";
import "./styles/global.css";
import { MyText } from "./components/MyText";

export default function App() {

const texts = [
  {
    title: "Meu título",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
  },
  {
    title: "Meu título",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
  },
  {
    title: "Meu título",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
  },
];

  return (
    //React Fragment
    <>
    {texts.map((text, index) => (
      <MyText key={index} title={`${index + 1} - ${text.title}`}>
        {text.text}
      </MyText>
    ))}
    </>
  );
}
