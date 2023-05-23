import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-elastic-carousel";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { API_KEY } from "../Api/Api";
import styled from "styled-components";

const baseImage = "https://image.tmdb.org/t/p/w500/";
const Container = styled.section``;

const Title = styled.h1`
  color: white;
  margin: 5rem;
`;

const BoxMovie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  img {
    margin-bottom: 10px;
  }
  h2 {
    margin-bottom: 5px;
  }
  h3 {
    font-size: 1rem;
    margin: 0;
  }
  p {
    font-size: 0.9rem;
    margin-top: 5px;
    color: #b1a5a5;
  }
  p:hover {
    cursor: pointer;
  }
`;

const HoverSinopse = styled.p`
  color: #ebe2e2;
  text-align: center;
  line-height: 1.2rem;
`;

const ButtonArrow = styled.button`
  height: 60px;
  background-color: transparent;
  border: none;
  position: relative;
  top: 40%;
  transform: translateY(-50%);

  &:hover {
    cursor: pointer;
  }
`;

function Carroussel() {
  const [movies, setMovies] = React.useState([]);
  const [showSinopse, setShowSinopse] = useState(false);

  useEffect(() => {
    getApiMovie();
  }, []);

  const getApiMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`
      );
      const { results } = response.data;
      const apiData = results.map((item) => ({
        ...item,
        image: `${baseImage}${item.poster_path}`,
      }));
      setMovies(apiData);
      console.log(apiData);
    } catch (error) {
      console.log(`Desculpe, houve uma falha: ${error}`);
    }
  };
  const toggleSinopse = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, showSinopse: !movie.showSinopse } : movie
      )
    );
  };

  const Arrow = ({ type, onClick, isEdge }) => {
    const Icon = type === "PREV" ? AiOutlineArrowLeft : AiOutlineArrowRight;
    return (
      <ButtonArrow onClick={onClick} disabled={isEdge}>
        <Icon size={30} style={{ color: "white" }} />
      </ButtonArrow>
    );
  };

  return (
    <Container>
      <Title>Últimos lançamentos</Title>
      <Carousel itemsToShow={4} itemPadding={[0, 20]} renderArrow={Arrow}>
        {movies.map((item) => (
          <BoxMovie key={item.id}>
            <img src={item.image} alt={item.title} style={{ width: "75%" }} />
            <h2>{item.title}</h2>
            <h3>{item.release_date.slice(0, 4)}</h3>
            <p onClick={() => toggleSinopse(item.id)}>Sinopse</p>
            <HoverSinopse
              className={`sinopse ${item.showSinopse ? "show" : ""} ${
                item.animateSinopse ? "animate" : ""
              }`}
            >
              {item.showSinopse ? item.overview : ""}
            </HoverSinopse>
          </BoxMovie>
        ))}
      </Carousel>
    </Container>
  );
}

export default Carroussel;
