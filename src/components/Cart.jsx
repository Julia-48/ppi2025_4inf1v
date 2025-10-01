import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Cart() {
  const { cart, updateQtyCart, clearCart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product, index) => (
              <li key={index} className={styles.cartItem}>
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price.toFixed(2)}</p>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() =>
                      product.quantity > 1
                        ? updateQtyCart(product.id, product.quantity - 1)
                        : removeFromCart(product.id)
                    }
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() =>
                      updateQtyCart(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cartTotal}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button className={styles.clearBtn} onClick={clearCart}>
            Remover todos os itens
          </button>
        </>
      )}
    </div>
  );
}