import React, { Fragment, useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieDialog from "./components/MovieDialog";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./App.css";
import apiKey from "./apiKey";
import { Input, InputAdornment, FormLabel } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function App() {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      const json = await response.json();
      setMovies(json.results);
      console.log(json.results);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    console.log(selectedMovie);
  }, [selectedMovie]);

  const search = async e => {
    e.preventDefault();
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`
    );
    const json = await response.json();
    setMovies(json.results);
    console.log(json.results);
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Top Movies
          </Typography>
          <form onSubmit={search}>
            <Input
              type="search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              startAdornment={
                <InputAdornment>
                  <span role="img" aria-label="Search">search</span>
                </InputAdornment>
              }
            />
          </form>
        </Toolbar>
      </AppBar>
      <div className="movies">
        {movies.map(movie => (
          <MovieCard
            movie={movie}
            key={movie.id}
            selectMovie={setSelectedMovie}
          />
        ))}
      </div>
      <MovieDialog handleClose={setSelectedMovie} movie={selectedMovie} />
    </Fragment>
  );
}

export default App;
