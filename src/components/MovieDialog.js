import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardMedia from "@material-ui/core/CardMedia";

function MovieDialog({ handleClose, movie }) {
  let title,
    content = null;
  if (movie) {
    title = <DialogTitle id="form-dialog-title">{movie.title}</DialogTitle>;
    content = (
      <DialogContent>
        <DialogContentText>{movie.overview}</DialogContentText>
        <CardMedia
          className="movie-image"
          image={`http://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
          title={movie.title}
        />
        <TextField
          label="Release date"
          type="date"
          value={movie.release_date}
          fullWidth
          disabled
        />
        <TextField
          label="Popularity"
          value={movie.popularity}
          fullWidth
          disabled
        />
        <TextField
          label="Vote average"
          value={movie.vote_average}
          fullWidth
          disabled
        />
        <TextField
          label="Vote count"
          value={movie.vote_count}
          fullWidth
          disabled
        />
      </DialogContent>
    );
  }

  return (
    <div>
      <Dialog
        open={!!movie}
        onClose={() => handleClose(null)}
        aria-labelledby="form-dialog-title"
      >
        {title}
        {content}
        <DialogActions>
          <Button onClick={() => handleClose(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MovieDialog;
