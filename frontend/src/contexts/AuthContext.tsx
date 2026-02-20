import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import axios from 'axios';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  picture?: string;
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  marketingEmail: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User) => void;
  signOut: () => void;
  signUp: (payload: UserPayload) => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const userStorage = localStorage.getItem('usuarioLogado');
    
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);


  const signIn = (userData: User) => {
    setUser(userData);
    localStorage.setItem('usuarioLogado', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('usuarioLogado');
  };

  const signUp = async (payload: UserPayload) => {
    setIsLoading(true);
    try {
        const response = await axios.post('/signup', payload);
        
        return response.data

    } catch (error: any) {
        console.error("Erro ao criar conta no backend:", error);
        const backEndMessage = error.response?.data?.message || "";
          if (backEndMessage.includes("Unique") || backEndMessage.includes("email")){
            throw new Error("Email já existente"); 
          }
        throw new Error("Erro ao criar conta"); 
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}