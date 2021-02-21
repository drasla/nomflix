import React, {useEffect} from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../components/Loader";
import Section from "../components/Section";
import Poster from "../components/Poster";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducer";
import {fetchTVs} from "../store/tv";

const Container = styled.div`
  padding-top: 70px;
`;

export const TV = () => {
    const {
        topRated,
        airingToday,
        popular,
        error,
        loading
    } = useSelector((state: RootState) => state.tvs);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTVs());
    }, [dispatch]);

    return (
        loading ?
            (
                <>
                    <Helmet>
                        <title>Loading | Nomflix</title>
                    </Helmet>
                    <Loader />
                </>
            ) : (
                <Container>
                    <Helmet>
                        <title>TV | Nomflix</title>
                    </Helmet>
                    {topRated && topRated.length > 0 &&
                    <Section title="Top Rated Shows">{topRated.map(show => <Poster key={show.id} id={show.id}
                                                                                   title={show.original_name}
                                                                                   imageUrl={show.poster_path}
                                                                                   rating={show.vote_average}
                                                                                   year={show.first_air_date && show.first_air_date.substring(0, 4)}/>)}</Section>}
                    {popular && popular.length > 0 &&
                    <Section title="Popular Shows">{popular.map(show => <Poster key={show.id} id={show.id}
                                                                                title={show.original_name}
                                                                                imageUrl={show.poster_path}
                                                                                rating={show.vote_average}
                                                                                year={show.first_air_date && show.first_air_date.substring(0, 4)}/>)}</Section>}
                    {airingToday && airingToday.length > 0 &&
                    <Section title="Airing Today Shows">{airingToday.map(show => <Poster key={show.id} id={show.id}
                                                                                         title={show.original_name}
                                                                                         imageUrl={show.poster_path}
                                                                                         rating={show.vote_average}
                                                                                         year={show.first_air_date && show.first_air_date.substring(0, 4)}/>)}</Section>}
                    {error && <Message text={error} color="#e74c3c" />}
                </Container>
            )
    );
}