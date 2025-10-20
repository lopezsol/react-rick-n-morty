import { HttpClient } from "../../../classes/http-client.class";
import type { ApiResponse } from "../../common/interfaces/api-response.interface";
import type { Character } from "../interfaces/character.interface";

const http = new HttpClient();
const BASE_URL = import.meta.env.VITE_RICK_MORTY_URL

export const getCharactersByPage = (page: number = 1) => {
    return http.get<ApiResponse<Character>>(`${BASE_URL}/character?page=${page}`);
};