import { useContext } from "react";
import { AnimeContext } from "../contexts/AnimeContext";

export function useAnime() {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error("Context error");
  }
  return context;
}
