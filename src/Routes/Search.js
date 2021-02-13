import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import Helmet from "react-helmet";
import {moviesApi, tvApi} from "../api";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

export const Search = () => {
    const [movieResults, setMovieResults] = useState([]);
    const [tvResults, setTvResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm !== "") {
            searchByTerm();
        }
    }

    const updateTerm = (event) => {
        const { target: { value } } = event;
        setSearchTerm(value);
    }

    const searchByTerm = async () => {
        setLoading(true);
        try {
            const {data: {results: movieResults}} = await moviesApi.search(searchTerm);
            const {data: {results: tvResults}} = await tvApi.search(searchTerm);
            setMovieResults(movieResults);
            setTvResults(tvResults);
            setLoading(false);
        } catch {
            this.setState({ error: "Can't find results."})
        }
    }



    return(
        <Container>
            <Helmet>
                <title>Search | Nomflix</title>
            </Helmet>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm}/>
            </Form>
            {loading ? (
                <>
                    <Helmet>
                        <title>Loading | Nomflix</title>
                    </Helmet>
                    <Loader/>
                </>
            ) : <>
                {movieResults && movieResults.length > 0 &&
                <Section title="Movie Results">{movieResults.map(movie => <Poster key={movie.id} id={movie.id}
                                                                                  title={movie.original_title}
                                                                                  imageUrl={movie.poster_path}
                                                                                  rating={movie.vote_average}
                                                                                  year={movie.release_date && movie.release_date.substring(0, 4)}
                                                                                  isMovie={true}/>)}</Section>}
                {tvResults && tvResults.length > 0 &&
                <Section title="TV Results">{tvResults.map(show => <Poster key={show.id} id={show.id}
                                                                           title={show.original_name}
                                                                           imageUrl={show.poster_path}
                                                                           rating={show.vote_average}
                                                                           year={show.first_air_date && show.first_air_date.substring(0, 4)}/>)}</Section>}
            </>}
            {error && <Message text={error} color="#e74c3c"/>}
            {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 &&
            <Message text="Nothing Found." color="#95a5a6"/>}
        </Container>
    );
}
