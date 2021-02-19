import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import Youtube from 'react-youtube';
// import movieTrailer from "movie-trailer";
import '../styles/Row.css';
import requests from '../utils/requests';

const iamgeBaseUrl = 'https://image.tmdb.org/t/p/w500/';

// * Shuffes the movies returned from the api call
const shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

function Row({ title, fetchUrl, isLargeRow }) {
  // * YouTube player embed options
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  // * Handles the click event to load trailer on poster
  const clickHandler = async (movie) => {
    let movieTrailer;
    let seriesTrailer;

    // * Series Trailer Request
    await axios
      .get(requests.fetchSeriesTrailer.replace(/id/, `${movie?.id}`))
      .then((response) => {
        seriesTrailer = response.data.results[0].key;
        setTrailerUrl(seriesTrailer);
      })
      .catch((error) => console.log(error.message));

    // * Movie Trailer Request
    if (!seriesTrailer) {
      await axios
        .get(requests.fetchMovieTrailer.replace(/id/, `${movie?.id}`))
        .then((response) => {
          movieTrailer = response.data.results[0].key;
          setTrailerUrl(movieTrailer);
        })
        .catch((error) => console.log(error));
    }

    // * Closes the YouTube embed
    if (trailerUrl) {
      setTrailerUrl('');
    }
  };

  useEffect(() => {
    // * Fetches the movie data
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const result = request.data.results;
      shuffle(result);
      setMovies(result);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => clickHandler(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${iamgeBaseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
