import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <div className={styles.cartIconWrapper}>
            <ShoppingBasket size={32} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </div>
          <p>
            {cart.length === 0
              ? "Carrinho vazio"
              : `Total: $${cart
                  .reduce(
                    (total, product) => total + product.price * product.quantity,
                    0
                  )
                  .toFixed(2)}`}
          </p>
        </div>
      </Link>
    </div>
  );
}