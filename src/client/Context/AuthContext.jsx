import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({username: '', id: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('http://localhost:5050/auth/check', { withCredentials: true });
        setLoggedIn(true);
        setUser({username: response.data.user.username, id: response.data.user.id})
      } catch (err) {
        setLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};