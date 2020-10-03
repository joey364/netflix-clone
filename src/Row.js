import React, { useState, useEffect } from "react";
import axios from "./axios";
import Youtube from "react-youtube";
// import movieTrailer from "movie-trailer";
import "./Row.css";
import requests from "./requests";

const iamgeBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  const clickHandler = async (movie) => {
    let movieTrailer;
    let seriesTrailer;

    let seriesTrailerRequest = await axios
      .get(requests.fetchSeriesTrailer.replace(/id/, `${movie?.id}`))
      .then((response) => {
          seriesTrailer = response.data.results[0].key;
          setTrailerUrl(seriesTrailer);
      })
      .catch((error) => console.log(error));

    if (!seriesTrailer) {
      let movieTrailerRequest = await axios
        .get(requests.fetchMovieTrailer.replace(/id/, `${movie?.id}`))
        .then((response) => {
          movieTrailer = response.data.results[0].key;
          setTrailerUrl(movieTrailer);
        })
        .catch((error) => console.log(error));

      console.log(movieTrailerRequest, seriesTrailerRequest);
    }

    if (trailerUrl) {
      setTrailerUrl("");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
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
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
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
