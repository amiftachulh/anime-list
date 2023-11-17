import { Link } from "react-router-dom";
import { dateOptions } from "../data/constant";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();

  const total = user!.statistics.anime.watching +
    user!.statistics.anime.completed +
    user!.statistics.anime.on_hold +
    user!.statistics.anime.dropped +
    user!.statistics.anime.plan_to_watch;

  const watchingPercent = user!.statistics.anime.watching / total * 100;
  const completedPercent = user!.statistics.anime.completed / total * 100;
  const onHoldPercent = user!.statistics.anime.on_hold / total * 100;
  const droppedPercent = user!.statistics.anime.dropped / total * 100;
  const planToWatchPercent = user!.statistics.anime.plan_to_watch / total * 100;

  useEffect(() => {
    document.title = "My Profile | AnimeList";
  }, []);

  return (
    <div className="p-2">
      <h1 className="font-bold text-lg">Profile</h1>
      <div className="lg:flex lg:gap-2">
        <div className="left">
          <div className="flex lg:block gap-8 py-2 border-t-2 lg:pb-0 lg:border-t-0">
            <img src={user?.images.webp.image_url} alt={user?.username} className="w-24 lg:w-[225px]" />
            <div className="font-bold lg:text-center lg:py-2">{user?.username}</div>
          </div>

          <div className="grid grid-cols-2 py-2 border-t-2 text-sm">
            <span className="text-slate-600">Last Online</span>
            <span>{new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(user!.last_online))}</span>
            <span className="text-slate-600">Gender</span>
            <span>{user?.gender}</span>
            <span className="text-slate-600">Joined</span>
            <span>{new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(user!.joined))}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="py-2 border-t-2 lg:pt-0 lg:border-t-0">
            <h2 className="font-bold">Anime Stats</h2>
            <table className="w-full">
              <thead></thead>
              <tbody>
                <tr className="h-4">
                  {watchingPercent ? <td style={{ width: `${watchingPercent}%` }} className="bg-green-600"></td> : null}
                  {completedPercent ? <td style={{ width: `${completedPercent}%` }} className="bg-blue-900"></td> : null}
                  {onHoldPercent ? <td style={{ width: `${onHoldPercent}%` }} className="bg-orange-500"></td> : null}
                  {droppedPercent ? <td style={{ width: `${droppedPercent}%` }} className="bg-rose-900"></td> : null}
                  {planToWatchPercent ? <td style={{ width: `${planToWatchPercent}%` }} className="bg-teal-500"></td> : null}
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between text-xs mt-1">
              <div className="days-watched">
                <span className="text-slate-600">Days: </span>
                <span className="font-bold">{user?.statistics.anime.days_watched}</span>
              </div>
              <div className="mean-score">
                <span className="text-slate-600">Mean Score: </span>
                <span className="font-bold">{user?.statistics.anime.mean_score}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 text-xs mt-1">
              <div className="stat ml-3">
                <div className="flex justify-between relative">
                  <span className="before:block before:bg-green-600 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded">Watching</span>
                  <span>2</span>
                </div>
                <div className="flex justify-between relative">
                  <span className="before:block before:bg-blue-900 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded">Completed</span>
                  <span>571</span>
                </div>
                <div className="flex justify-between relative">
                  <span className="before:block before:bg-orange-500 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded">On-Hold</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between relative">
                  <span className="before:block before:bg-rose-900 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded">Dropped</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between relative">
                  <span className="before:block before:bg-teal-500 before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded">Plan to Watch</span>
                  <span>26</span>
                </div>
              </div>
              <div className="total">
                <div className="flex justify-between">
                  <span>Total Entries</span>
                  <span>599</span>
                </div>
                <div className="flex justify-between">
                  <span>Rewatched</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>Episodes</span>
                  <span>6,300</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2 border-t-2 lg:border-t-0">
            <h2 className="font-bold">Favorites</h2>
            <div className="mt-1">
              <div className="text-sm">Anime ({user?.favorites.anime.length})</div>
              <div className="flex gap-1 overflow-x-auto">
                {user?.favorites.anime.map(a => (
                  <Link key={a.mal_id} to={`/anime/${a.mal_id}`} className="group flex-shrink-0 relative border-[1px]">
                    <img src={a.images.webp.image_url} alt={a.title} className="w-[72px] h-[112px] object-cover" loading="lazy" />
                    <div className="absolute w-full p-1 bg-black bg-opacity-50 -translate-y-full text-slate-100 text-xs opacity-0 group-hover:opacity-100 duration-200">
                      {a.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-1">
              <div className="text-sm">Character ({user?.favorites.characters.length})</div>
              <div className="flex gap-1 overflow-x-auto">
                {user?.favorites.characters.map(char => (
                  <div key={char.mal_id} className="group flex-shrink-0 relative border-[1px]">
                    <img src={char.images.webp.image_url} alt={char.name} className="w-[72px] h-[112px] object-cover" loading="lazy" />
                    <div className="absolute w-full p-1 bg-black bg-opacity-50 -translate-y-full text-slate-100 text-xs opacity-0 group-hover:opacity-100 duration-200">
                      {char.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-1">
              <div className="text-sm">People ({user?.favorites.people.length})</div>
              <div className="flex gap-1 overflow-x-auto">
                {user?.favorites.people.map(p => (
                  <div key={p.mal_id} className="group flex-shrink-0 relative border-[1px]">
                    <img src={p.images.jpg.image_url} alt={p.name} className="w-[72px] h-[112px] object-cover" loading="lazy" />
                    <div className="absolute w-full p-1 bg-black bg-opacity-50 -translate-y-full text-slate-100 text-xs opacity-0 group-hover:opacity-100 duration-200">
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
