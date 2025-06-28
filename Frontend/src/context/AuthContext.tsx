// import { createContext, useContext, useState, ReactNode } from "react";

// type User = {
//   id?: string;
//   name?: string;
//   email?: string;
//   // Add other user fields as needed
// };

// type AuthContextType = {
//   isAuthorized: boolean;
//   setIsAuthorized: (value: boolean) => void;
//   user: User;
//   setUser: (user: User) => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [user, setUser] = useState<User>({});

//   return (
//     <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for consuming the context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };





import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from 'axios';

type User = {
  id?: string;
  name?: string;
  email?: string;
  profilepic?: {
    url: string;
  };
  // Add other user fields as needed
};

type AuthContextType = {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
  user: User;
  setUser: (user: User) => void;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User>({});
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthorized(true);
    }
  }, []);

  const login = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);
    setIsAuthorized(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Set default axios headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setToken(null);
    setUser({});
    setIsAuthorized(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthorized, 
      setIsAuthorized, 
      user, 
      setUser,
      token,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};