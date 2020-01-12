import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./MovieCard.css";
import { Grid } from "@material-ui/core";

function MovieCard({ movie, selectMovie }) {
  return (
    <Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card className="movie-card">
          <CardActionArea>
            <CardMedia
              className="movie-image"
              image={`http://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
              title={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {movie.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => selectMovie(movie)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
}

export default MovieCard;
