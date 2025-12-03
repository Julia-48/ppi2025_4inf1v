import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export const SessionContext = createContext({
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
  isAdmin: false,
  makeAdmin: () => {},
  removeAdmin: () => {},
});

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data?.session ?? null);
        if (data?.session?.user) {
           // Load admin status from users table
           try {
             const { data: userData } = await supabase
               .from("users")
               .select("is_admin")
               .eq("id", data.session.user.id)
               .single();
             setIsAdmin(userData?.is_admin ?? false);
           } catch (e) {
             setIsAdmin(false);
           }
        }
      } catch (e) {
        // ignore
      }
    }

    initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s?.user) {
         // Load admin status from users table
         try {
           supabase
             .from("users")
             .select("is_admin")
             .eq("id", s.user.id)
             .single()
             .then(({ data: userData }) => {
               if (userData) setIsAdmin(userData.is_admin);
             });
         } catch (e) {
           setIsAdmin(false);
         }
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      mounted = false;
      if (authListener && authListener.subscription && authListener.subscription.unsubscribe) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      if (data.user) {
        setSessionMessage("Registration successful! Check your email to confirm your account.");
        window.location.href = "/signin";
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        setSessionMessage("Sign in successful!");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setSession(null);
      setIsAdmin(false);
      window.location.href = "/";
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function makeAdmin(userId) {
    try {
      setSessionMessage(null);
      setSessionError(null);

       // Update user admin status in the users table
       const { data, error } = await supabase
         .from("users")
         .update({ is_admin: true })
         .eq("id", userId)
         .select()
         .single();

      if (error) throw error;

      // If it's the current user, update local state
      if (session?.user?.id === userId) {
        setIsAdmin(true);
        setSession((prev) => ({
          ...prev,
          user: { ...prev?.user, user_metadata: { ...prev?.user?.user_metadata, admin: true } },
        }));
      }

      setSessionMessage("User promoted to admin successfully!");
      return data;
    } catch (error) {
      setSessionError(error.message);
      throw error;
    }
  }

  async function removeAdmin(userId) {
    try {
      setSessionMessage(null);
      setSessionError(null);

       // Update user admin status in the users table
       const { data, error } = await supabase
         .from("users")
         .update({ is_admin: false })
         .eq("id", userId)
         .select()
         .single();

      if (error) throw error;

      // If it's the current user, update local state
      if (session?.user?.id === userId) {
        setIsAdmin(false);
        setSession((prev) => ({
          ...prev,
          user: { ...prev?.user, user_metadata: { ...prev?.user?.user_metadata, admin: false } },
        }));
      }

      setSessionMessage("Admin privileges removed successfully!");
      return data;
    } catch (error) {
      setSessionError(error.message);
      throw error;
    }
  }

  const value = {
    session,
    sessionLoading,
    sessionMessage,
    sessionError,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    isAdmin,
    makeAdmin,
    removeAdmin,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
