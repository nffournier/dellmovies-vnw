import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../Api/Api";
import styled from "styled-components";

const Lista = styled.ul`
  max-width: 100%;
  height: 5vh;
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
`;

const ItemNav = styled.li`
  color: white;

  list-style: none;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &.ativo {
    border-bottom: 2px solid #747474;
    box-shadow: 0px 3px 6px #0000005c;
  }
`;

const Dropdown = styled.div`
  color: white;

  display: flex;
  justify-content: center;
`;

const BoxFilme = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: 0.5rem;
  text-align: center;
`;

const FilmeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  /* Largura da caixa de filme */
  img {
    width: 75%;
  }
  p {
    font-size: 1rem;
  }
`;
export default function Generos() {
  const [filmes, setFilmes] = useState([]);
  const [generoSelecionado, setGeneroSelecionado] = useState(null);

  const generos = [
    { id: null, name: "Popular" },
    { id: 18, name: "Drama" },
    { id: 28, name: "Ação" },
    { id: 12, name: "Aventura" },
    { id: 35, name: "Comédia" },
    { id: 80, name: "Crime" },
    { id: 14, name: "Fantasia" },
    { id: 10751, name: "Família" },
  ];

  const handleClickGenero = async (genero) => {
    if (genero === generoSelecionado) {
      setGeneroSelecionado(null);
      setFilmes([]);
    } else {
      setGeneroSelecionado(genero);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genero.id}&page=1`
        );
        setFilmes(response.data.results.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Lista>
        {generos.map((genero) => (
          <ItemNav
            key={genero.id}
            onClick={() => handleClickGenero(genero)}
            className={genero.id === generoSelecionado?.id ? "ativo" : ""}
          >
            {genero.name}
          </ItemNav>
        ))}
      </Lista>
      {generoSelecionado && (
        <Dropdown>
          <BoxFilme>
            {filmes.map((filme) => (
              <FilmeItem key={filme.id} width="500px">
                <img
                  src={`https://image.tmdb.org/t/p/w400${filme.poster_path}`}
                  alt={filme.title}
                />
                <p>{filme.title}</p>
              </FilmeItem>
            ))}
          </BoxFilme>
        </Dropdown>
      )}
    </>
  );
}
