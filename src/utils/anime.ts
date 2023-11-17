import axios from "axios";
import { Character } from "../types/character";

const BASE_URL = "https://api.jikan.moe/v4";

export async function getAnimeById(id: string | undefined) {
  const res = await axios.get(`${BASE_URL}/anime/${id}`);
  return res.data.data;
}

export async function getCharactersByAnimeId(id: string | undefined) {
  try {
    const res = await axios.get(`${BASE_URL}/anime/${id}/characters`);
    const limitCharacter: Character[] = res.data.data.slice(0, 10);
    const modified = limitCharacter.map(char => ({
      ...char,
      voice_actors: char.voice_actors.filter(va => va.language === "Japanese")
    }));
    return modified;
  } catch (error) {
    console.error(error);
  }
}

export async function searchAnime(q: string) {
  try {
    const res = await axios.get(`${BASE_URL}/anime?q=${q}&limit=10`);
    return res.data.data;
  } catch (error) {
    console.error();
  }
}
