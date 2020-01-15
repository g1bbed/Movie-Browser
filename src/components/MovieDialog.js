import React, { Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Slide,
  List,
  ListItem,
  Toolbar,
  IconButton,
  Divider
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import "./MovieDialog.css";

var dateFormat = require("dateformat");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MovieDialog({ handleClose, movie }) {
  let monthyear,
    percentagepath,
    content = null;
  let bkgrndimage = "none";
  if (movie) {
    percentagepath = Math.round((movie.vote_average * 100) / 10);
    monthyear = dateFormat(movie.release_date, "mmmm, yyyy");
    bkgrndimage = `url(http://image.tmdb.org/t/p/w1280${movie.backdrop_path})`;
    content = (
      <List>
        <ListItem>
          <div className="movie-selected-section">
            <img
              className="movie-selected-poster"
              src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt="movieposter"
            />
            <h3>{movie.title}</h3>
            <div className="movie-selected-label1">{monthyear}</div>
            <div className="movie-selected-label2">
              {percentagepath}% user score
            </div>
          </div>
        </ListItem>
        <Divider />
        <ListItem>
          <div className="movie-selected-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
        </ListItem>
      </List>
    );
  }

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={!!movie}
        onClose={() => handleClose(null)}
        TransitionComponent={Transition}
      >
        <div
          className="movie-selected-root"
          style={{
            backgroundImage: `${bkgrndimage}`
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleClose(null)}
              aria-label="ArrowBack"
            >
              <ArrowBack />
            </IconButton>
          </Toolbar>
          {content}
        </div>
      </Dialog>
    </Fragment>
  );
}

export default MovieDialog;
