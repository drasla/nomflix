import {MovieDetail, Movie, TVDetail, TV} from "types";

export const isMovieDetail = (
    target: MovieDetail | TVDetail | null
): target is MovieDetail => {
    return (target as MovieDetail).title !== undefined;
};

export const isMovieItem = (
    target: Movie | TV
): target is Movie => {
    return (target as Movie).title !== undefined;
};