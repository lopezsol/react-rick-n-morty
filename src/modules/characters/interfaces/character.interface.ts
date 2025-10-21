import type { Location } from "./location.interface";

type Status = "Alive" | "Dead" | "unknown";
type Gender = "Female" | "Male" | "Genderless" | "unknown";
export interface Character {
    id: number;
    name: string;
    status: Status
    species: string;
    type: string;
    gender: Gender;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}