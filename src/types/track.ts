export type Album = {
  id: string;
  images: string;
  name: string;
  release_date: string;
};

export type Artists = {
  id: string;
  name: string;
};

export type Track = {
  album: Album;
  artists: Artists;
  id: string;
  name: string;
  duration_ms: number;
};

export type OriginalTrack = {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: [{ url: string; height: number; width: number }];
    name: string;
    release_date: string;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: [
      {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
  };
  artists: [
    {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }
  ];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};
