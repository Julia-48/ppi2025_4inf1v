import { useState, useEffect, useContext } from "react";
import styles from "./AdminPanel.module.css";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../context/SessionContext";

export function AdminPanel() {
  const { session, isAdmin, makeAdmin, removeAdmin } = useContext(SessionContext);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      if (!isAdmin) return;
      
      setLoading(true);
      try {
        // Fetch all users from the users table
        const { data, error } = await supabase.from("users").select();
        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    }
    
    loadUsers();
  }, [isAdmin]);

  async function handleMakeAdmin() {
    if (!email.trim()) {
      setError("Digite um email válido");
      return;
    }

    try {
      setError(null);
      setMessage(null);

       // First check if user exists in users table
       const { data: user, error: findError } = await supabase
         .from("users")
         .select()
         .eq("email", email)
         .single();
     
       if (findError || !user) {
         setError(findError?.message || "Usuário não encontrado");
         return;
       }

       if (user.is_admin) {
        return;
      }

      await makeAdmin(user.id);
      
      // Update local users list
      setUsers(users.map(u => 
        u.id === user.id 
           ? { ...u, is_admin: true }
          : u
      ));
      
      setEmail("");
      setMessage(`Usuário ${email} promovido a admin!`);
    } catch (err) {
      setError(err.message || "Erro ao promover usuário");
    }
  }

  async function handleRemoveAdmin(userId, userEmail) {
    try {
      setError(null);
      setMessage(null);

      await removeAdmin(userId);
      
      // Update local users list
      setUsers(users.map(u => 
        u.id === userId 
           ? { ...u, is_admin: false }
          : u
      ));
      
      setMessage(`Privilégios de admin removidos de ${userEmail}`);
    } catch (err) {
      setError(err.message || "Erro ao remover admin");
    }
  }

  if (!session) return <p>Faça login para acessar esta área.</p>;
  if (!isAdmin) return <p>Você não tem permissão para acessar esta área.</p>;

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminBox}>
        <h2 className={styles.adminTitle}>Painel de Administração</h2>
        
        {error && <div className={styles.adminError}>{error}</div>}
        {message && <div className={styles.adminSuccess}>{message}</div>}

        <div className={styles.adminForm}>
          <h3>Promover Usuário a Admin</h3>
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Digite o email do usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.adminInput}
              onKeyPress={(e) => e.key === "Enter" && handleMakeAdmin()}
            />
            <button onClick={handleMakeAdmin} className={styles.adminButton}>
              Promover a Admin
            </button>
          </div>
        </div>

        <div className={styles.usersList}>
          <h3>Usuários Registrados</h3>
          {loading ? (
            <p>Carregando usuários...</p>
          ) : users.length === 0 ? (
            <p>Nenhum usuário encontrado</p>
          ) : (
            <ul className={styles.usersList}>
              {users.map((user) => (
                <li key={user.id} className={styles.userItem}>
                  <div className={styles.userInfo}>
                    <strong>{user.email}</strong>
                    <span className={styles.userBadge}>
                       {user.is_admin ? "✓ Admin" : "Usuário"}
                    </span>
                  </div>
                   {user.is_admin && user.id !== session.user.id && (
                    <button
                      onClick={() => handleRemoveAdmin(user.id, user.email)}
                      className={styles.adminButtonDanger}
                    >
                      Remover Admin
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
