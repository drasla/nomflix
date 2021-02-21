import React, {useEffect} from "react";
import styled from "styled-components";
import Section from "../components/Section";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Poster from "../components/Poster";
import Helmet from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducer";
import {fetchMovies} from "../store/movie";

const Container = styled.div`
  padding-top: 70px;
`;

export const Movie = () => {
    const {
        nowPlaying,
        topRated,
        popular,
        upcoming,
        error,
        loading
    } = useSelector((state: RootState) => state.movies);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    return (
        loading ? (
            <>
                <Helmet>
                    <title>Loading | Nomflix</title>
                </Helmet>
                <Loader/>
            </>
        ) : (
            <Container>
                <Helmet>
                    <title>Movies | Nomflix</title>
                </Helmet>
                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing">{nowPlaying.map(movie => <Poster key={movie.id} id={movie.id}
                                                                                  title={movie.original_title}
                                                                                  imageUrl={movie.poster_path}
                                                                                  rating={movie.vote_average}
                                                                                  year={movie.release_date && movie.release_date.substring(0, 4)}
                                                                                  isMovie={true}/>)}</Section>
                )}
                {topRated && topRated.length > 0 && (
                    <Section title="topRated">{topRated.map(movie => <Poster key={movie.id} id={movie.id}
                                                                             title={movie.original_title}
                                                                             imageUrl={movie.poster_path}
                                                                             rating={movie.vote_average}
                                                                             year={movie.release_date && movie.release_date.substring(0, 4)}
                                                                             isMovie={true}/>)}</Section>
                )}
                {upcoming && upcoming.length > 0 && (
                    <Section title="Upcoming">{upcoming.map(movie => <Poster key={movie.id} id={movie.id}
                                                                             title={movie.original_title}
                                                                             imageUrl={movie.poster_path}
                                                                             rating={movie.vote_average}
                                                                             year={movie.release_date && movie.release_date.substring(0, 4)}
                                                                             isMovie={true}/>)}</Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular">{popular.map(movie => <Poster key={movie.id} id={movie.id}
                                                                           title={movie.original_title}
                                                                           imageUrl={movie.poster_path}
                                                                           rating={movie.vote_average}
                                                                           year={movie.release_date && movie.release_date.substring(0, 4)}
                                                                           isMovie={true}/>)}</Section>
                )}
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
        )
    );
}