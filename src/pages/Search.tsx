import { useEffect, useState } from "react";
import { searchAnime } from "../utils/anime";
import { AnimeInfo, Pagination } from "../types/anime";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../data/constant";

export default function Search() {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [result, setResult] = useState<AnimeInfo[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const page = [];
  const [selectedPage, setSelectedPage] = useState(1);

  if (pagination?.last_visible_page) {
    for (let i = 1; i <= pagination.last_visible_page; i++) {
      page.push(i);
    }
  }

  useEffect(() => {
    async function getAnime() {
      try {
        const res = await axios.get(`${BASE_URL}/anime?q=${query}&limit=10&page=${selectedPage}`);
        setResult(res.data.data)
      } catch (error) {
        console.error();
      }
    }
    getAnime();
  }, [selectedPage])

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();
      setLastQuery(query);
      const res = await searchAnime(query);
      setResult(res?.data);
      setPagination(res?.pagination)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.title = "Search | AnimeList";
  }, []);

  return (
    <div className="p-2 lg:min-h-[500px]">
      <h1 className="font-bold text-center">Search</h1>
      <form className="relative flex mt-2 border-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 px-2 py-3"
          placeholder="Search..."
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <button className="w-[50px] grid place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z" /></svg>
        </button>
      </form>
      {lastQuery && <p className="bg-slate-700 p-2 mt-2 text-slate-100 text-sm">Search result for "{lastQuery}"</p>}
      {result.map(anime => (
        <div key={anime.mal_id} className="flex gap-2 mt-2">
          <Link to={`/anime/${anime.mal_id}`}>
            <img src={anime.images.webp.image_url} alt={anime.title} className="w-16 h-24 object-cover" loading="lazy" />
          </Link>
          <div className="flex-1">
            <Link to={`/anime/${anime.mal_id}`} className="text-sky-800 hover:text-sky-950 font-bold text-sm">{anime.title}</Link>
            <div className="text-xs text-slate-600">
              <div className="type">{anime.type}{anime.episodes && ` (${anime.episodes} eps)`}</div>
              <div className="score">Scored {anime.score}</div>
              <div className="members">{new Intl.NumberFormat("en-US").format(anime.members)} members</div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-2">
      {pagination?.items.count && page.map(num => <button className="p-2 bg-slate-700 text-slate-100" onClick={() => setSelectedPage(num)}>{num}</button>)}
      </div>
    </div>
  );
}
