import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';

function App() {

    const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        searchMovies("Batman");
      }, []);

    const searchMovies = async (title) => {

        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search)

    };
    
    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                tpyte="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={this.onKeyPressValue.key === "Enter" ? searchMovies(searchTerm):{}}
                placeholder="Search for movies"
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
                </div>
            ) : (
                <div className="empty">
                <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
    
}

export default App;