import React, {useState} from "react";
import styled from "styled-components";
import Loader from "../components/Loader";
import Section from "../components/Section";
import Message from "../components/Message";
import Poster from "../components/Poster";
import Helmet from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducer";
import {fetchResults} from "../store/search";

const Container = styled.div`
  padding-top: 70px;
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
    const {
        movieResults,
        tvResults,
        error,
        loading
    } = useSelector((state: RootState) => state.search);

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm !== "") {
            dispatch(fetchResults(searchTerm));
        }
    }

    const updateTerm = (event) => {
        const { target: { value } } = event;
        setSearchTerm(value);
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
