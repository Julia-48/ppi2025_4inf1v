// Product.tsx
import styles from './Product.module.css';

export function Product({ id, thumbnail, brand, titulo, preco, descricao }) {
    return (
        <div className={styles.product} key={id}>
            <img 
                src={thumbnail}
                alt={titulo}
                className={styles.productImage} 
            />
            <h2 className={styles.productTitle}>
                {brand} {titulo}
            </h2>
            <p className={styles.productPrice}>Price: ${preco}</p>
            <p className={styles.productDescription}>{descricao}</p>
            <button className={styles.addToCartBtn} onClick={() => alert(`Added "${titulo}" to cart!`)}>
                Add to Cart 🛒
            </button>
        </div>
    );
}
