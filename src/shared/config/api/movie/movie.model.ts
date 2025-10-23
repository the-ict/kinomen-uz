import { IMovie } from "@/features/create-analyses/ui";

interface SearchMovieResponse {
    Response: string;
    Search?: IMovie[];
    total?: String;
    Error?: String;
}

export type {SearchMovieResponse};