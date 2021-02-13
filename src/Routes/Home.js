import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import Helmet from "react-helmet";
import {moviesApi} from "../api";

const Container = styled.div`
  padding: 20px;
`;

export const Home = () => {
    const [nowPlaying, setNowPlaying] = useState(null);
    const [upcoming, setUpcoming] = useState(true);
    const [popular, setPopular] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const {data: {results: nowPlaying}} = await moviesApi.nowPlaying();
            const {data: {results: upcoming}} = await moviesApi.upComing();
            const {data: {results: popular}} = await moviesApi.popular();
            setNowPlaying(nowPlaying);
            setUpcoming(upcoming);
            setPopular(popular);
            setLoading(false);
        } catch {
            setError("Can't find movie information");
        }
    };

    useEffect(() => {
        getData();
    }, []);

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