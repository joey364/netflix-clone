import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import requests from '../utils/requests';
import Youtube from 'react-youtube';
import '../styles/Banner.css'

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const getTrailer = async (movie) => {
    await axios
      .get(requests.fetchSeriesTrailer.replace(/id/, `${movie?.id}`))
      .then((response) => {
        let movieTrailer = response.data.results[0].key;
        setTrailerUrl(movieTrailer);
      })
      .catch((error) => console.log(error));

  };

  // const imageBaseUrl = 'https://image.tmdb.org/t/p/original/';
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <>
      <header
        onClick={() => {
          if (trailerUrl) {
            setTrailerUrl('');
          }
        }}
        className="banner"
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                    )`,
          backgroundPosition: 'center center',
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.name || movie?.title || movie?.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button"
              onClick={() => getTrailer(movie)}
            >
              Play
            </button>
            <button
              className="banner__button"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              My List
            </button>

            <h1 className="banner__description">
              {truncate(movie?.overview, 150)}
            </h1>
          </div>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </>
  );
}

export default Banner;
