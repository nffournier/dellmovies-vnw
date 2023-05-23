import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../Api/Api";
import styled from "styled-components";

const baseURL = "https://api.themoviedb.org/3";
const baseImage = "https://image.tmdb.org/t/p/w500/";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  h1 {
    align-self: flex-start;
    margin: 5rem;
  }
`;

const Images = styled.div`
  display: flex;
  max-width: 100%;
  padding: 0 5%;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
`;
const Box = styled.div`
  width: 20%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;

  img {
    max-width: 100%;
    margin-bottom: 10px;
  }
  h2 {
    margin: 0;
    font-size: 1.4rem;
  }
  h3 {
    margin: 0;
    font-weight: 200;
    font-size: 1rem;
  }
`;
const ButtonsPage = styled.div`
  height: 5vh;
  width: fit-content;
  text-align: center;
  margin: 2rem;
  button {
    margin: 10px;
    background: transparent;
    color: white;
    border: solid 1px white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    font-size: 1.1rem;

    &:hover {
      cursor: pointer;
      background-color: #747474;
    }
  }
`;
const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${currentPage}`
      );
      const { results, total_pages } = response.data;
      setMovies(results);
      setTotalPages(total_pages);
    } catch (error) {
      console.log("Ocorreu um erro ao buscar os filmes em alta.", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationButtons = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <Container>
      <h1>Em alta</h1>
      <Images>
        {movies.map((movie) => (
          <Box key={movie.id}>
            <img src={`${baseImage}${movie.poster_path}`} alt={movie.title} />
            <h2>{movie.title}</h2>
            <h3>{movie.release_date.slice(0, 4)}</h3>
          </Box>
        ))}
      </Images>
      <ButtonsPage>
        {paginationButtons.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </ButtonsPage>
    </Container>
  );
};

export default TopMovies;
