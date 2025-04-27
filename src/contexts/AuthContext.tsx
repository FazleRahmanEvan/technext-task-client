/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";

interface AuthState {
  user: { userId: string | null; token: string | null };
}

const initialState: AuthState = {
  user: { userId: null, token: null },
};

type Action =
  | { type: "LOGIN"; payload: { userId: string; token: string } }
  | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: { userId: action.payload.userId, token: action.payload.token },
      };
    case "LOGOUT":
      return { user: { userId: null, token: null } };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthState | any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Define the type for children explicitly
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        { email, password }
      );
      const { token, userId } = response.data;
      localStorage.setItem("authToken", token); // Store token in localStorage
      dispatch({ type: "LOGIN", payload: { userId, token } });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/signup`,
        { email, password, name }
      );
      const { token, userId } = response.data;
      localStorage.setItem("authToken", token); // Store token in localStorage
      dispatch({ type: "LOGIN", payload: { userId, token } });
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
