import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {tvApi} from "../api";
import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Poster from "../Components/Poster";
import Message from "../Components/Message";

const Container = styled.div`
  padding: 20px;
`;

export const TV = () => {
    const [topRated, setTopRated] = useState(null);
    const [popular, setPopular] = useState(true);
    const [airingToday, setAiringToday] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const {data: {results: topRated}} = await tvApi.topRated();
            const {data: {results: popular}} = await tvApi.popular();
            const {data: {results: airingToday}} = await tvApi.airingToday();
            setTopRated(topRated);
            setPopular(popular);
            setAiringToday(airingToday);
            setLoading(false);
        } catch {
            setError("Can't find TV information");
        }
    }

    useEffect(() => {
        getData();
    }, []);

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