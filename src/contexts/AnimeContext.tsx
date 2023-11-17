import { createContext, useEffect, useState } from "react";
import { AnimeInfo } from "../types/anime";
import axios from "axios";
import { BASE_URL } from "../data/constant";

type Context = {
  anime: AnimeInfo[]
};

export const AnimeContext = createContext<Context | null>(null);

export default function AnimeProvider({ children }: { children: React.ReactNode }) {
  const [anime, setAnime] = useState<AnimeInfo[]>([]);
  const [loading, setLoading] = useState(true);

  async function getAnime() {
    try {
      const res = await axios.get(`${BASE_URL}/seasons/now`);
      setAnime(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAnime();
  }, []);

  const value = { anime };

  return !loading && (
    <AnimeContext.Provider value={value}>
      {children}
    </AnimeContext.Provider>
  );
}
