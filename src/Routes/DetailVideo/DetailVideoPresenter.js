import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";

const Container = styled.div`
  position: relative;
  padding: 20px 0px;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
  height: 100%;
`;

const ItemContainer = styled.div`
  padding: 20px 0px;
  display: grid;
  width: 100%;
  grid-template-rows: repeat(auto-fill, 200px);
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IFrame = styled.div`
    width: 100%;
`;

const ContryDiv = styled.div`
margin-top: 20px;
`;

const iFrame = (src) => {
    return (
      <iframe src={src} />
    );
}
const DetailVideoPresenter = ({result, loading, error}) => (
    loading ? <Loader/> :
        <Container>
            <Content>
                {result && result.videos && Object.keys(result.videos).length > 0 && (
                    <ItemContainer>
                        {result.videos.results.map(video =>
                            <List key={video.id}>
                                {video.site === "YouTube" ? (
                                    iFrame(`https://www.youtube.com/embed/${video.key}`)
                                    ) : ""}
                            </List>)}
                    </ItemContainer>
                )}

            </Content>
            {error && <Message text={error} color="#e74c3c"/>}
        </Container>
);

DetailVideoPresenter.propTypes = {
    result: PropTypes.objectOf(
        PropTypes.shape({
            belongs_to_collection: PropTypes.objectOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    poster_path: PropTypes.string,
                    name: PropTypes.string
                })
            ),
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
}

export default DetailVideoPresenter;
