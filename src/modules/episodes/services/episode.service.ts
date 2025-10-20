import { HttpClient } from "../../../classes/http-client.class";
import type { Episode } from "../interfaces/episode.interface";

const http = new HttpClient();

export const getEpisode = (url: string) => {
    return http.get<Episode>(url);
};