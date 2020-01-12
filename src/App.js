import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieDialog from "./components/MovieDialog";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import apiKey from "./apiKey";
import { Input, Grid, Container } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import logo from "./images/logo.png";

//create theme
const outerTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#01D277",
      main: "#01D277",
      dark: "#01D277",
      contrastText: "#01D277"
    },
    secondary: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
      contrastText: "#ffffff"
    }
  }
});

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
    <div className="main">
      <ThemeProvider theme={outerTheme}>
        <Container maxWidth="lg" className="header">
          <Grid container spacing={0}>
            <Grid item sm={2} xs={12}>
              <img src={logo} alt="logo" className="logo-image" />
            </Grid>
            <Grid item sm={10} xs={12}>
              <form
                onSubmit={search}
                style={{ color: "#ff0000 !important" }}
                className="header-search"
              >
                <Input
                  style={{
                    color: "#01D277",
                    paddingLeft: "8px",
                    fontWeight: "400",
                    marginRight: "12px"
                  }}
                  disableUnderline={true}
                  className="Search-text-field"
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  width="300px"
                  placeholder="Search"
                />
                <SearchIcon className="search-icon" />
              </form>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={0}>
            <Typography variant="h6" className={classes.title} style={{color: "white", paddingTop: "12px", paddingBottom: "12px"}}>
              Popular movies
            </Typography>
          </Grid>
          <Grid container spacing={0}>
            {movies.map(movie => (
              <MovieCard
                movie={movie}
                key={movie.id}
                selectMovie={setSelectedMovie}
              />
            ))}
            <MovieDialog handleClose={setSelectedMovie} movie={selectedMovie} />
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
