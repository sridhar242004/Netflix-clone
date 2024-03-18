import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = "9da165ba1392e6920274a59dd81f068a"; // Replace with your TMDB API key

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        // Fetch the trailer key for the selected movie
        const response = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );

        // Check if there is a trailer available
        const trailerKey =
          response.data.results.find((result) => result.type === "Trailer") ||
          response.data.results[0];

        if (trailerKey) {
          setTrailerUrl(trailerKey.key);
        } else {
          console.log("No trailer found");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
