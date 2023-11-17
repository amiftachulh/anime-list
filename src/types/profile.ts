type Image = {
  jpg: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
  webp: {
    image_url: string;
    small_image_url?: string;
    large_image_url?: string;
  };
};

type Anime = {
  mal_id: number;
  url: string;
  images: Image;
  title: string;
  type: string;
  start_year: number;
};

type Manga = {
  mal_id: number;
  url: string;
  images: Image;
  title: string;
  type: string;
  start_year: number;
};

type Character = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url?: string;
    };
  };
  name: string;
};

type Person = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  name: string;
};

type AnimeEntry = {
  entry: {
    mal_id: number;
    url: string;
    images: Image;
    title: string;
  };
  score: number;
  status: string;
  episodes_seen: number | null;
  episodes_total: number | null;
  date: string;
};

type MangaEntry = {
  entry: {
    mal_id: number;
    url: string;
    images: Image;
    title: string;
  };
  score: number;
  status: string;
  chapters_read: number | null;
  chapters_total: number | null;
  date: string;
};

type Updates = {
  anime: AnimeEntry[];
  manga: MangaEntry[];
};

type Statistics = {
  anime: {
    days_watched: number;
    mean_score: number;
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
    total_entries: number;
    rewatched: number;
    episodes_watched: number;
  };
  manga: {
    days_read: number;
    mean_score: number;
    reading: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_read: number;
    total_entries: number;
    reread: number;
    chapters_read: number;
    volumes_read: number;
  };
};

type Favorites = {
  anime: Anime[];
  manga: Manga[];
  characters: Character[];
  people: Person[];
};

export type UserInfo = {
  mal_id: number;
  username: string;
  url: string;
  images: Image;
  last_online: string;
  gender: string;
  birthday: string | null;
  location: string | null;
  joined: string;
  statistics: Statistics;
  favorites: Favorites;
  updates: Updates;
};
