import { createContext, useEffect, useState } from "react";
import { UserInfo } from "../types/profile";
import axios from "axios";
import { BASE_URL } from "../data/constant";

type Context = {
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<Context | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      login(username, password);
    }
  }, []);

  async function login(username: string, password: string) {
    const res = await axios.get(`${BASE_URL}/users/${username}/full`);
    if (res.data.data.mal_id.toString() !== password) {
      throw new Error("wrong_password");
    }
    setUser(res.data.data);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("username");
    localStorage.removeItem("password");
  }

  const value = { user, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

