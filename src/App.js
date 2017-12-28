import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery'; 
import axios from 'axios';
import MovieDetails from './MovieDetails';

class App extends Component {
  constructor() {
    super();
    window.app = this;
    // this.handleNew = this.handleNew.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.movieSelected = this.movieSelected.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    // this.handleNew();
  }

  // handleNew() {
  //   $(document).ready(() => {
  //    $('#searchForm').on('submit',(e)=>{
  //      e.preventDefault();
  //     let searchText = $('#searchText').val();
  //     // this.getMovies(searchText);
  //    })
  //   });
  // }
  
  onChangeSearchText(event){
    if(event != null){
       let searchText = $('#searchText').val();
      if(event.target){
          this.getMovies(searchText);
       }else{
        this.getMovies(null);
       }
     }
  }
  getMovies(searchText){
    var urlString ='https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText;
axios.get(urlString)
    .then((response) => {
       // console.log(response);
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) =>{
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" onerror=this.src="https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png">
                        <h5>${movie.title}</h5>
                         <a onclick="window.app.movieSelected({id:${movie.id}})" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
        `;
        });
    
    $('#movies').html(output);
    })
    .catch((err) =>{
       console.log(err);
    });


    // $.ajax({
    //   url: urlString ,
    //   dataType: 'json',
    //   cache: false,
    //   success: function(response) {
    //      let movies = response.results;
    //     console.log(movies);
    //     let output = '';

    //     $.each(movies, function(index, val){
    //         output += '<div class="col-md-3">';
    //         output +=   '<div class="well text-center">';
    //         output +=       '<img src="http://image.tmdb.org/t/p/w185/'+val.poster_path+'" onerror=this.src="https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png">';
    //         output +=       '<h5>'+ val.title+'</h5>';
    //         output +=       '<a onclick="window.app.movieSelected({id:${val.id}})" class="btn btn-primary" href="#">Movie Details</a>';
    //         output +=   '</div>';
    //         output += '</div>';
    //     });

    //     $('#movies').html(output);
    //   },
    //   error: function(xhr, status, err) {
    //     console.error(urlString, status, err.toString());
    //   }
    // });


  }
 
  movieSelected(movie) {
    $(document).ready(() => {
    let myMovieId = movie.id;
       ReactDOM.render(<MovieDetails movieId={myMovieId}/>, document.getElementById('root'));
    });
  }
  

  render() {
    return (
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="index.html">MovieInfo</a>
              </div>
            </div>
          </nav>

          <div className="jumbotron">
            <h3 className="text-center">Search For Any Movie</h3>
            <form id="searchForm">
              <input type="text" onChange={this.onChangeSearchText} className="form-control" id="searchText" placeholder="Search Movies..." />
            </form>
          </div>


          <div className="container">
            <div id="movies" className="row"></div>
          </div>


        </div>
      </div>

    );
  }
}

export default App;
