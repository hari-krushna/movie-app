import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery';
import axios from 'axios';
import App from './App';

class MovieDetails extends Component {
  constructor() {
    super();
    this.state = { movieId: '' }
    window.movieDetails = this;
    this.getMovie = this.getMovie.bind(this);
    this.SearchMovies = this.SearchMovies.bind(this);
    this.getMovie();
  }

  getMovie() {
    $(document).ready(() => {
      let movieId = this.props.movieId;
      let urlString = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=fa155f635119344d33fcb84fb807649b';

      axios.get(urlString)
        .then((response) => {
          console.log(response.data);
          var movie = response.data;
          var generations_api = "", prod_companies_api = "", spoken_languages_api = "";
          var generations = "", prod_companies = "", spoken_languages = "";
          for (var i = 0; i < movie.genres.length; i++) {
            generations_api = generations_api + movie.genres[i].name + ' , ';
          }
          generations = generations_api.slice(0, -2);

          for (var j = 0; j < movie.production_companies.length; j++) {
            prod_companies_api = prod_companies_api + movie.production_companies[j].name + ' , ';
          }
          prod_companies = prod_companies_api.slice(0, -2);

          for (var k = 0; k < movie.spoken_languages.length; k++) {
            spoken_languages_api = spoken_languages_api + movie.spoken_languages[k].name + ' , ';
          }
          spoken_languages = spoken_languages_api.slice(0, -2);
          let output = `
        <div class="row">
          <div class="col-md-4">
          <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" style="height:300px" onerror=this.src="https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${generations}</li>
              <li class="list-group-item"><strong>Status:</strong> ${movie.status}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}, <strong>Vote Count:</strong> ${movie.vote_count}</li>
              <li class="list-group-item"><strong>Popularity:</strong> ${movie.popularity}</li>
               <li class="list-group-item"><strong>Production Companies:</strong> ${prod_companies}</li>
               <li class="list-group-item"><strong>Spoken languages:</strong> ${spoken_languages}</li>
               <li class="list-group-item"><strong>Budget:</strong> ${movie.budget}</li>
              <li class="list-group-item"><strong>Revenue:</strong> ${movie.revenue}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View on  IMDB</a>
            <a onclick="window.movieDetails.SearchMovies()" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

          $('#movie').html(output);

        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  SearchMovies() {
    $(document).ready(() => {
      ReactDOM.render(<App />, document.getElementById('root'));
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="movie" className="well"></div>
        </div>
      </div>

    );
  }
}

export default MovieDetails;
