import styles from "./MyTextList.module.css";
import { MyText } from "./MyText";

export function MyTextList() {
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
    {
      title: "Meu título",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
    },
    {
      title: "Meu título",
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
    },
    // {
    //   title: "Meu título",
    //   text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
    // },
    // {
    //   title: "Meu título",
    //   text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
    // },
    // {
    //   title: "Meu título",
    //   text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
    // },
    // {
    //   title: "Meu título",
    //   text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam recusandae voluptatem, soluta tempora, vitae modi nihil, quos maxime maiores fugit sit reiciendis odio commodi? Doloremque excepturi dignissimos exercitationem laborum suscipit.",
    // },
  ];

  return (
    //React Fragment

    <div>
    <h1 className={styles.title}>Meus textos</h1>
    <div className={styles.container}>
      {texts.map((text, index) => (
        <MyText key={index} title={`${index + 1} - ${text.title}`}>
          {text.text}
        </MyText>
      ))}
    </div>
    </div>
  );
}
