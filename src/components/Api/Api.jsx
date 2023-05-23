export const API_KEY = "bb5d63109a9e04f3dad53a204c4e1458";

export const categories = [
  {
    name: "now",
    title: "Últimos lançamentos",
    path: `/movie/now_playing?api_key=${API_KEY}&language=pt-BR`,
    isLarge: true,
  },
  {
    name: "trending",
    title: "Em Alta",
    path: `/trending/movie/week?api_key=${API_KEY}&language=pt-BR`,
    isLarge: false,
  },
];

export const getMovies = async (path) => {
  try {
    let url = `https://api.themoviedb.org/3${path}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getMovies: ", error);
  }
};
