import { Track } from "../../../api/SpotifyApiService/SpotifyApiServiceI";
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Profile = { user: { name: string; image: any }; songs: Track[] };
