import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../service/CartContext";

export function ProductList() {
  const { products, loading, error } = useContext(CartContext);
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase());
  }

  function handleClear() {
    setSearch("");
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={search}
          onChange={handleSearch}
        />
        <button className={styles.searchButton} onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#001111" }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message} ❌</p>}
    </div>
  );
}