import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../Api/Api";
import styled from "styled-components";
import { BsFillStarFill, BsFillPlayFill } from "react-icons/bs";
import { FaFilm } from "react-icons/fa";

const Wrapper = styled.div`
  color: white;
  height: 80vh;
`;
const BoxText = styled.div`
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-start;

  h1 {
    margin-left: 5rem;
    font-size: 2.3rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    margin-bottom: 0;
  }
`;

const Year = styled.p`
  margin-top: 0;
  margin-left: 5rem;
  margin-bottom: 0;
  font-size: 1rem;
`;
const Avaliação = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0;
  margin-left: 5rem;
  font-size: 1rem;

  p {
    font-size: 1.2rem;
    text-shadow: 0.5px 1px 1px rgba(0, 0, 0, 0.5);
  }
`;

const Sinopse = styled.p`
  width: 29vw;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 5rem;
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.5);
`;

const BoxButtons = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 5rem;

  button {
    width: 180px;
    padding: 10px 20px;
    border-radius: 30px;
    font-family: "Open Sans", sans-serif;
    font-size: 1rem;
    color: white;
    font-weight: 600;
    border: none;
  }
  button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Play = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d53a00;
`;

const Trailer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #717171;
`;

const baseImage = "https://image.tmdb.org/t/p/w1280/";

const BannerArea = () => {
  const [movies, setMovies] = useState([]);
  const [background, setBackground] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`
        );
        const { results } = response.data;
        const apiMovies = results.map((item) => ({
          ...item,
          poster: `${baseImage}${item.backdrop_path}`,
        }));
        const filteredMovies = apiMovies.filter((movie) => movie.id === 76600);

        setMovies(filteredMovies);
        setBackground(filteredMovies);
      } catch (error) {
        console.log(`Desculpe, houve uma falha: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      {background.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundImage: `url(${item.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
        >
          <BoxText>
            <h1>{item.title}</h1>
            <Year>{item.release_date.slice(0, 4)}</Year>
            <Avaliação>
              <BsFillStarFill size={25} color="#F3CD32" />
              <p>{item.vote_average}/10</p>
            </Avaliação>
            <Sinopse>Sinopse: {item.overview}</Sinopse>

            <BoxButtons>
              <Play>
                <BsFillPlayFill size={25} />
                <span>Assista agora</span>
              </Play>

              <Trailer>
                <FaFilm size={22} />
                <span>Trailer</span>
              </Trailer>
            </BoxButtons>
          </BoxText>
        </div>
      ))}
    </Wrapper>
  );
};

export default BannerArea;
