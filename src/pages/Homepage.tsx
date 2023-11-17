import { Link } from "react-router-dom";
import { useAnime } from "../hooks/useAnime";
import { useEffect } from "react";

export default function Homepage() {
  const { anime } = useAnime();

  useEffect(() => {
    document.title = "Homepage | AnimeList";
  }, []);

  return (
    <div className="px-4 pt-2 pb-4">
      <h1 className="font-bold text-2xl mb-2 text-center">Fall 2023</h1>
      <div className="grid grid-cols-fill gap-4 place-items-center justify-between">
        {anime.map(a => (
          <Link key={a.mal_id} to={`/anime/${a.mal_id}`} className="relative overflow-hidden border-[1px]" title={a.title}>
            <img src={a.images.webp.image_url} alt={a.title} className="w-[200px] h-[282px] object-cover" loading="lazy" />
            <div className="grid items-center absolute w-full bg-black bg-opacity-60 -translate-y-full h-16 px-4">
              <div className="w-full whitespace-nowrap text-ellipsis overflow-hidden text-slate-100 text-center font-bold text-sm">
                {a.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
