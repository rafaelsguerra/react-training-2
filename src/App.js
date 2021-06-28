import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import MoviesList from './components/MoviesList';
import AddMovie from "./components/AddMovie";
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null)
    try {
      const response = await axios.get("https://react-http-2601b-default-rtdb.firebaseio.com/movies.json");

      const data = response.data;

      const loadedMovies = [];
      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        });
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  const handleAddMovie = async (movie) => {
    console.log(movie);
    try {
      const response = await axios.post("https://react-http-2601b-default-rtdb.firebaseio.com/movies.json", movie);
      console.log(response);
      await handleFetchMovies();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={handleAddMovie}></AddMovie>
      </section>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}.</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
