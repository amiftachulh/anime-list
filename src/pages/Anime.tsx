import { useLoaderData } from "react-router-dom";
import { AnimeInfo } from "../types/anime";
import { sentenceCase } from "../utils";
import { dateOptions } from "../data/constant";
import { Character } from "../types/character";
import { useEffect } from "react";

export default function Anime() {
  const { anime, characters } = useLoaderData() as {
    anime: AnimeInfo;
    characters: Character[]
  };

  useEffect(() => {
    document.title = `${anime.title} | AnimeList`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-lg font-bold text-center lg:text-left">{anime.title}</h1>
      <p className="font-bold text-center text-slate-600 mb-2 lg:text-left">{anime.title_english}</p>

      <div className="lg:flex lg:gap-2">
        <div className="lg:w-[200px]">
          <img src={anime.images.webp.image_url} alt={anime.title} className="m-auto lg:m-0" />

          <div className="pt-2">
            <h2 className="font-bold">Alternative Titles</h2>
            {anime.title_synonyms.length ? (
              <div className="text-sm">
                <span className="font-bold text-gray-700">Synonyms: </span>
                <span>{anime.title_synonyms.join(", ")}</span>
              </div>
            ) : null}
            <div className="text-sm">
              <span className="font-bold text-gray-700">Japanese: </span>
              <span>{anime.title_japanese}</span>
            </div>
            {anime.title_english && (
              <div className="text-sm">
                <span className="font-bold text-gray-700">English: </span>
                <span>{anime.title_english}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <h2 className="font-bold">Information</h2>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Type: </span>
              <span>{anime.type}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Episodes: </span>
              <span>{anime.episodes ? anime.episodes : "Unknown"}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Status: </span>
              <span>{anime.status}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Aired: </span>
              <span>
                {anime.aired.from ? new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(anime.aired.from)) : "?"}
                {" "}to{" "}
                {anime.aired.to ? new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(anime.aired.to)) : "?"}
              </span>
            </div>
            {anime.season && (
              <div className="text-sm">
                <span className="font-bold text-gray-700">Premiered: </span>
                <span>{sentenceCase(anime.season)} {anime.year}</span>
              </div>
            )}
            {anime.broadcast.string && (
              <div className="text-sm">
                <span className="font-bold text-gray-700">Broadcast: </span>
                <span>{anime.broadcast.string}</span>
              </div>
            )}
            <div className="text-sm">
              <span className="font-bold text-gray-700">Producers: </span>
              <span>{anime.producers.map(producer => producer.name).join(", ")}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Licensors: </span>
              <span>{anime.licensors.length ? anime.licensors.map(licensor => licensor.name).join(", ") : "None found"}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Studios: </span>
              <span>{anime.studios.map(studio => studio.name).join(", ")}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Source: </span>
              <span>{anime.source}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Genres: </span>
              <span>{anime.genres.map(genre => genre.name).join(", ")}</span>
            </div>
            {anime.themes.length ? (
              <div className="text-sm">
                <span className="font-bold text-gray-700">Themes: </span>
                <span>{anime.themes.map(theme => theme.name).join(", ")}</span>
              </div>
            ) : null}
            {anime.demographics.length ? (
              <div className="text-sm">
                <span className="font-bold text-gray-700">Demographic: </span>
                <span>{anime.demographics.map(demographic => demographic.name).join(", ")}</span>
              </div>
            ) : null}
            <div className="text-sm">
              <span className="font-bold text-gray-700">Duration: </span>
              <span>{anime.duration}</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-gray-700">Rating: </span>
              <span>{anime.rating}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 lg:pt-0 lg:flex-1">
          <div className="bg-slate-200">
            <div className="flex border-[1px] rounded p-2">
              <div className="border-r-[1px] pr-2 border-slate-400">
                <div className="bg-blue-700 text-slate-100 text-xs text-center">SCORE</div>
                <div className="font-bold text-2xl text-center">{anime.score ? anime.score : "N/A"}</div>
                <div className="text-xs">{anime.scored_by ? `${new Intl.NumberFormat("en-US").format(anime.scored_by)} users` : "- users"}</div>
              </div>
              <div className="flex flex-col justify-between flex-1 pl-2">
                <div className="flex justify-between gap-2">
                  <div className="ranked">
                    <span className="text-sm lg:text-base">Ranked </span>
                    <span className="font-bold">{anime.rank ? `#${anime.rank}` : "N/A"}</span>
                  </div>
                  <div className="popularity">
                    <span className="text-sm lg:text-base">Popularity </span>
                    <span className="font-bold">#{anime.popularity}</span>
                  </div>
                  <div className="member">
                    <span className="text-sm lg:text-base">Members </span>
                    <span className="font-bold">{new Intl.NumberFormat("en-US").format(anime.members)}</span>
                  </div>
                </div>
                <div className="text-xs">
                  <span className="pr-2 border-r-[1px] border-slate-400">{anime.type}</span>
                  <span className="pl-2">{anime.studios.map(studio => studio.name).join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h2 className="font-bold">Synopsis</h2>
            <p className="text-sm">{anime.synopsis ? anime.synopsis : "No synopsis information has been added to this title."}</p>
          </div>

          <div className="pt-2">
            <h2 className="font-bold">Background</h2>
            <p className="text-sm">{anime.background ? anime.background : "No background information has been added to this title."}</p>
          </div>

          <div className="pt-2">
            <h2 className="font-bold">Characters & Voice Actors</h2>
            {characters.map(char => (
              <div key={char.character.mal_id} className="flex justify-between p-2 text-xs border-b-[1px] border-slate-400 last:border-b-0 last:pb-0">
                <div className="flex gap-2">
                  <img src={char.character.images.webp.image_url} alt={char.character.name} className="w-10" />
                  <div>
                    <div>{char.character.name}</div>
                    <div>{char.role}</div>
                  </div>
                </div>
                {char.voice_actors.length ? (
                  <div className="flex gap-2">
                    <div>
                      <div className="text-right">{char.voice_actors[0].person.name}</div>
                      <div className="text-right">{char.voice_actors[0].language}</div>
                    </div>
                    <img src={char.voice_actors[0].person.images.jpg.image_url} alt={char.voice_actors[0].person.name} className="w-10" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
