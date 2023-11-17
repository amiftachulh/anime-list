type CharacterImage = {
  jpg: {
    image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url?: string;
  };
};

type VoiceActor = {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  language: string;
};

type AnimeCharacter = {
  mal_id: number;
  url: string;
  images: CharacterImage;
  name: string;
};

export type Character = {
  character: AnimeCharacter;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
};
