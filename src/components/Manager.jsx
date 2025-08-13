import { useState } from "react";
import styles from "./Manager.module.css";

export function Manager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", price: "" });
  const [editing, setEditing] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.price) return;
    if (editing) {
      setProducts(products.map(p =>
        p.id === form.id ? { ...p, title: form.title, price: Number(form.price) } : p
      ));
      setEditing(false);
    } else {
      setProducts([...products, { ...form, id: Date.now(), price: Number(form.price) }]);
    }
    setForm({ id: null, title: "", price: "" });
  }

  function handleEdit(product) {
    setForm(product);
    setEditing(true);
  }

  function handleRemove(id) {
    setProducts(products.filter(p => p.id !== id));
    if (editing && form.id === id) {
      setForm({ id: null, title: "", price: "" });
      setEditing(false);
    }
  }

  return (
    <div className={styles.managerContainer}>
      <div className={styles.managerBox}>
        <h2 className={styles.managerTitle}>Gerenciar Produtos</h2>
        <form onSubmit={handleSubmit} className={styles.managerActions}>
          <input
            name="title"
            placeholder="Nome do produto"
            value={form.title}
            onChange={handleChange}
            className={styles.managerInput}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Preço"
            value={form.price}
            onChange={handleChange}
            className={styles.managerInput}
            required
            min={0}
            step={0.01}
          />
          <button type="submit" className={styles.managerButton}>
            {editing ? "Atualizar" : "Adicionar"}
          </button>
        </form>
        <ul className={styles.managerList}>
          {products.map(product => (
            <li key={product.id} className={styles.managerItem}>
              <div className={styles.managerItemInfo}>
                <strong>{product.title}</strong> - R$ {product.price.toFixed(2)}
              </div>
              <div className={styles.managerItemActions}>
                <button
                  className={styles.managerButton}
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </button>
                <button
                  className={styles.managerButton}
                  onClick={() => handleRemove(product.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}