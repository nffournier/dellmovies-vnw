import React from "react";
import LogoDell from "./LogoDell.svg";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 10vh;
  width: 100%;
  color: white;
  display: flex;
  position: fixed;
  text-decoration: none;
  background-color: rgba(108, 122, 137 /1);
  backdrop-filter: blur(15px);
`;
const ContainerLogo = styled.div`
  margin-left: 5em;
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    height: 60%;
  }
  p {
    font-weight: 600;
    color: white;
  }
`;
const Menu = styled.nav`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    text-decoration: none;
    gap: 3.2em;
    justify-content: center;
    align-items: center;
  }
  li {
    color: #fffefe;
    list-style-type: none;
    font-weight: 600;
  }
  li:hover {
    color: #ffffff;
    background-color: #747474;
    padding: 10px 25px;
    border-radius: 50px;
    box-shadow: 0px 3px 6px #0000005c;
    opacity: 1;
    cursor: pointer;
    transition: background ease-in 0.1s;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  width: 25%;
  height: 100%;
  align-items: center;
  justify-content: end;
  margin-right: 4em;
  gap: 3em;
  a {
    text-decoration: none;
    color: #ffffff;
    font-weight: 800;
  }
  a:hover {
    background-color: #747474;
    padding: 10px 25px;
    border-radius: 50px;
    box-shadow: 0px 3px 6px #0000005c;
    opacity: 1;
    cursor: pointer;
    transition: background ease 0.3s;
  }
`;

function MenuNav() {
  return (
    <Wrapper>
      <ContainerLogo>
        <img src={LogoDell} alt="Logo Dell Movies" />
        <p>Movies</p>
      </ContainerLogo>
      <Menu>
        <ul>
          <li>Séries</li>
          <li>Filmes</li>
        </ul>
      </Menu>
      <SearchWrapper>
        <FaSearch size={25} />
        <a href="">Filtro</a>
        <a href="">Login</a>
      </SearchWrapper>
    </Wrapper>
  );
}

export default MenuNav;
