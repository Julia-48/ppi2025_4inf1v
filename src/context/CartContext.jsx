import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext({
  // Context to manage the products state
  products: [],
  loading: false,
  error: null,
  // Context to manage the cart state
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("product_1v").select();
      if (error) {
        setError(`Fetching products failed! ${error.message}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();
    // State to manage products API
    // var category = "smartphones";
    // var limit = 10;
    // var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

    // async function fetchProducts() {
    //   try {
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     setProducts(data.products);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // fetchProducts();
  }, []);

  // State to manage the cart
  const [cart, setCart] = useState(() => {
    // initialize from localStorage for guest
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const { session } = useContext(SessionContext);

  const LOCAL_CART_KEY = "cart";

  // helper: persist local cart to localStorage
  function persistLocalCart(items) {
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }

  // helper: load cart for authenticated user from Supabase
  async function loadCartForUser(user_id) {
    try {
      const { data, error } = await supabase
        .from("cart")
        .select("product_id, quantity, metadata")
        .eq("user_id", user_id);
      if (error) {
        console.error("Error loading cart:", error);
        return;
      }
      const loaded = data.map((row) => ({
        id: row.product_id,
        quantity: row.quantity,
        metadata: row.metadata,
        // ensure price and title are top-level for compatibility with UI
        price: row.metadata?.price ? Number(row.metadata.price) : 0,
        title: row.metadata?.title ?? undefined,
        thumbnail: row.metadata?.thumbnail ?? undefined,
      }));
      setCart(loaded);
    } catch (e) {
      console.error(e);
    }
  }

  // helper: merge local cart into remote on login
  async function mergeLocalToRemote(user_id) {
    try {
      const raw = localStorage.getItem(LOCAL_CART_KEY);
      if (!raw) return;
      const local = JSON.parse(raw);
      for (const item of local) {
        // attempt insert, if conflict then update quantity
        const product_id = item.id;
        const metadata = item.metadata || {};
        try {
          const { error: insertError } = await supabase
            .from("cart")
            .insert(
              [
                { user_id: user_id, product_id, quantity: item.quantity, metadata },
              ],
              { upsert: false }
            );
          if (insertError) {
            // conflict or other -> read then update
            const { data: existing, error: selErr } = await supabase
              .from("cart")
              .select("quantity")
              .match({ user_id, product_id })
              .single();
            if (selErr) {
              // if not found, try update direct
              await supabase
                .from("cart")
                .upsert(
                  [{ user_id, product_id, quantity: item.quantity, metadata }],
                  { onConflict: ["user_id", "product_id"] }
                );
            } else {
              const newQty = (existing.quantity || 0) + item.quantity;
              await supabase
                .from("cart")
                .update({ quantity: newQty, metadata })
                .match({ user_id, product_id });
            }
          }
        } catch (e) {
          console.error("merge item error", e);
        }
      }
      // after merge, clear local cart
      localStorage.removeItem(LOCAL_CART_KEY);
      // reload remote cart into state
      await loadCartForUser(user_id);
    } catch (e) {
      console.error(e);
    }
  }

  async function addToCart(product) {
    const product_id = product.id;
    const metadata = { title: product.title, price: product.price, thumbnail: product.thumbnail };
    if (session?.user?.id) {
      const user_id = session.user.id;
      try {
        // try insert
        const { error: insertError } = await supabase
          .from("cart")
          .insert([{ user_id, product_id, quantity: 1, metadata }], { upsert: false });
        if (insertError) {
          // conflict -> increment
          const { data: existing, error: selErr } = await supabase
            .from("cart")
            .select("quantity")
            .match({ user_id, product_id })
            .single();
          if (selErr) throw selErr;
          const newQty = (existing.quantity || 0) + 1;
          await supabase
            .from("cart")
            .update({ quantity: newQty, metadata })
            .match({ user_id, product_id });
        }
        await loadCartForUser(user_id);
      } catch (e) {
        console.error("Error adding to remote cart", e);
      }
    } else {
      // guest: store locally
      setCart((prev) => {
        const existing = prev.find((it) => it.id === product_id);
        let next;
        if (existing) {
          next = prev.map((it) =>
            it.id === product_id ? { ...it, quantity: it.quantity + 1 } : it
          );
        } else {
          // store price/title at top-level for UI
          next = [
            ...prev,
            {
              id: product_id,
              quantity: 1,
              metadata,
              price: metadata?.price ? Number(metadata.price) : 0,
              title: metadata?.title ?? undefined,
              thumbnail: metadata?.thumbnail ?? undefined,
            },
          ];
        }
        persistLocalCart(next);
        return next;
      });
    }
  }

  async function removeFromCart(productId) {
    if (session?.user?.id) {
      try {
        await supabase.from("cart").delete().match({ user_id: session.user.id, product_id: productId });
        await loadCartForUser(session.user.id);
      } catch (e) {
        console.error(e);
      }
    } else {
      setCart((prev) => {
        const next = prev.filter((item) => item.id !== productId);
        persistLocalCart(next);
        return next;
      });
    }
  }

  async function updateQtyCart(productId, quantity) {
    if (session?.user?.id) {
      try {
        if (quantity <= 0) {
          await supabase.from("cart").delete().match({ user_id: session.user.id, product_id: productId });
        } else {
          await supabase
            .from("cart")
            .update({ quantity })
            .match({ user_id: session.user.id, product_id: productId });
        }
        await loadCartForUser(session.user.id);
      } catch (e) {
        console.error(e);
      }
    } else {
      setCart((prev) => {
        const next = prev.map((item) => (item.id === productId ? { ...item, quantity } : item));
        persistLocalCart(next);
        return next;
      });
    }
  }

  async function clearCart() {
    if (session?.user?.id) {
      try {
        await supabase.from("cart").delete().eq("user_id", session.user.id);
        setCart([]);
      } catch (e) {
        console.error(e);
      }
    } else {
      setCart([]);
      persistLocalCart([]);
    }
  }

  // Sync behavior: when session changes
  useEffect(() => {
    if (session?.user?.id) {
      // merge local into remote then load remote
      mergeLocalToRemote(session.user.id);
    } else {
      // not authenticated: ensure state comes from localStorage
      try {
        const raw = localStorage.getItem(LOCAL_CART_KEY);
        setCart(raw ? JSON.parse(raw) : []);
      } catch (e) {
        setCart([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);


  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    // session is handled in SessionContext
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}