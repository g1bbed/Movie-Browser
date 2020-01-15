import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import "./MovieCard.css";
import { Grid } from "@material-ui/core";

function MovieCard({ movie, selectMovie }) {
  let dateFormat = require("dateformat");
  let percentagepath, monthyear, customspan;

  if (movie) {
    percentagepath = Math.round((movie.vote_average * 100) / 10);
    monthyear = dateFormat(movie.release_date, "mmmm, yyyy");
    if (movie.vote_average > 7) {
      customspan = "moviecard-span-green";
    }
    if (movie.vote_average > 4 && movie.vote_average < 6.9) {
      customspan = "moviecard-span-orange";
    }
    if (movie.vote_average < 3.9) {
      customspan = "moviecard-span-red";
    }
  }

  return (
    <Fragment>
      <Grid item xs={6} sm={4} md={3}>
        <Card className="movie-card">
          <CardActionArea onClick={() => selectMovie(movie)}>
            <CardContent>
              <div className="movie-image-box">
                <img
                  src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="posterimage"
                  className="movie-image"
                />
                <div className="movie-badge">
                  <span className={customspan}>{percentagepath} %</span>
                </div>
              </div>
              <p>
                {movie.title}
                <br />
                <span>{monthyear}</span>
              </p>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Fragment>
  );
}

export default MovieCard;
