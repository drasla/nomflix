import React, {useEffect} from "react";
import styled from "styled-components";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducer";
import {useLocation, useParams } from "react-router-dom";
import {fetchMovieDetail, fetchTVDetail} from "../store/detail";
import { Helmet } from "react-helmet";
import { isMovieDetail } from "types/typeGuard";
import DetailMain from "components/Detail/DetailMain";
import Similar from "components/Detail/Similar";

const Container = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div<ImageProps>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;

interface ImageProps {
    bgImage: string
}

export const Detail = () => {
    const { pathname } = useLocation();
    const { id } = useParams<{ id: string }>();
    const parsedId = parseInt(id);

    const isMovie = pathname.includes("/movie/");

    const { result, loading, error } = useSelector(
        (state: RootState) => state.detail
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isMovie ? fetchMovieDetail(parsedId) : fetchTVDetail(parsedId));
    }, [dispatch, id, isMovie]);

    return (
        loading ? <Loader/> :
            <Container>
                <Helmet>
                    (
                    <title>{`${isMovieDetail(result) ? result.title : result?.name}`}</title>
                </Helmet>
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result?.backdrop_path}`}/>
                <DetailMain result={result} />
                <Similar />
                {error && <Message text={error} color="#e74c3c"/>}
            </Container>
    );
};