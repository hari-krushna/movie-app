import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../css/custom-style.css';
import $ from 'jquery';
import axios from 'axios';
import Movie from './Movie';
import MovieVideo from './MovieVideo';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // movieId: '' 
    };
    window.movieDetails = this;
  }

  
  componentDidMount(){
    $(document).ready(() => {
      //Assigning the movieId received from Movie Component to a local varaiable
     let movieId = this.props.movieId;

      // generating url to which to which request is to made based on the movieId
      let urlString = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=fa155f635119344d33fcb84fb807649b';

      axios.get(urlString)
        .then((response) => {
          //console.log(response.data);
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
          <div class="well" style="background-color: #ffffff!important;">
            <h3>Plot</h3>
            <p>${movie.overview}</p>
          </div>
          <div class="well" style="background-color: #ffffff!important;">
          <div class="text-center btn-group btn-group-justified">
          <a id="btn-imdb" href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-warning" style="background-color: #F27F33;border-color: #F27F33;">View on IMDB</a>
          <a id="btn-search" onclick="window.movieDetails.SearchMovies()" class="btn btn-default" style="color: #021860;border-color: #f5f5f5 5px solid;">Search Page</a>
          <a id="btn-trailer" onclick="window.movieDetails.redirectMovieTrailer()" class="btn btn-success">Trailer/Clips</a>
          </div>
          </div>
        </div>
      `;
          //Assigning movie details to html element with id movie
          $('#movie').html(output);

        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  // Go back to Movie Search Page
  SearchMovies = () => {
    $(document).ready(() => {
      ReactDOM.render(<Movie />, document.getElementById('root'));
    });
  }

  // For Trailer
  redirectMovieTrailer = () => {
    $(document).ready(() => {
      ReactDOM.render(<MovieVideo  movieId={this.props.movieId} />, document.getElementById('root'));
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
