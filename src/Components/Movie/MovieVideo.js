import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../css/custom-style.css';
import $ from 'jquery';
import Movie from './Movie';
import MovieDetails from './MovieDetails';

class MovieVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // trailer_src: '//www.youtube.com/embed/',
            // movie_video: false,
            // movie_teaser: false,
            // movie_clip: false,
            // trailer_name: '',
            // video_notfound: false
        };
        window.movieTrailer = this;
    }

    componentDidMount() {
        var movieId = this.props.movieId;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US&api_key=fa155f635119344d33fcb84fb807649b",
            "method": "GET",
            "headers": {},
            "data": "{}"
        }

        $.ajax(settings)
            .done(function (response) {
                var results = response.results;
                console.log(results);


                if ($.isEmptyObject(response.results)) {
                    var output = `
                    <div class="well">
                    <h3 class="text-center">Sorry. No trailer or any related videos found for this movie!</h3>
                    <img id="notfoundimg" class="img-responsive center-block" src="http://videoadvertisingnews.com/wp-content/uploads/2017/11/Screenshot-from-2017-10-16-23-05-56.png" alt="img" />
                    </div>`;
                    $('#videos').html(output);
                }
                else {
                    let videos = response.results;
                    let output = '';
                    $.each(videos, (index, video) => {
                        output += `
                        <div class="col-md-12">  
                            <h1 class="text-center">${video.name}</h1>
                            <div class="intrinsic-container intrinsic-container-16x9">
                            <iframe title="YouTube video player" class="well center-block responsive"
                             width="500" height="300" src="//www.youtube.com/embed//${video.key}" frameborder="0" 
                             allowfullscreen allowtransparency="true" data-ratio="16:9"></iframe>
                              </div>
                              <br/>
                        </div>`;
                    });
                    $('#videos').html(output);
                }



                // if (results.length === 0) {
                //     window.movieTrailer.setState({ movie_video: false });
                //     window.movieTrailer.setState({ video_notfound: true });
                // }
                // else {

                //     for (var i = 0; i < results.length; i++) {

                //         // var expr = results[i].type.toLowerCase();
                //         // switch (expr) {
                //         //     case 'trailer':
                //         //         window.movieTrailer.setState({ movie_video: true });
                //         //         window.movieTrailer.setState({ movie_teaser: false });
                //         //         window.movieTrailer.setState({ movie_clip: false });
                //         //         window.movieTrailer.setState({ video_notfound: false });
                //         //         window.movieTrailer.setState({ trailer_src: window.movieTrailer.state.trailer_src + results[i].key });
                //         //         window.movieTrailer.setState({ trailer_name: results[i].name });
                //         //         break;
                //         //     case 'teaser':
                //         //         window.movieTrailer.setState({ movie_video: true });
                //         //         window.movieTrailer.setState({ movie_teaser: true });
                //         //         window.movieTrailer.setState({ movie_clip: false });
                //         //         window.movieTrailer.setState({ video_notfound: false });
                //         //         window.movieTrailer.setState({ trailer_src: window.movieTrailer.state.trailer_src + results[i].key });
                //         //         window.movieTrailer.setState({ trailer_name: results[i].name });
                //         //         break;
                //         //     case 'clip':
                //         //         window.movieTrailer.setState({ movie_video: true });
                //         //         window.movieTrailer.setState({ movie_clip: true });
                //         //         window.movieTrailer.setState({ movie_teaser: false });
                //         //         window.movieTrailer.setState({ video_notfound: false });
                //         //         window.movieTrailer.setState({ trailer_src: window.movieTrailer.state.trailer_src + results[i].key });
                //         //         window.movieTrailer.setState({ trailer_name: results[i].name });
                //         //         break;
                //         //     default:
                //         //         console.log('Sorry, we are out of ' + expr + '.');
                //         // }




                //         if (results[i].name.includes('Trailer') || results[i].name.includes('trailer')
                //             || results[i].type === 'Trailer' || results[i].type === 'trailer') {
                //             window.movieTrailer.setState({ movie_video: true });
                //             window.movieTrailer.setState({ movie_teaser: false });
                //             window.movieTrailer.setState({ movie_clip: false });
                //             window.movieTrailer.setState({ video_notfound: false });
                //             window.movieTrailer.setState({ trailer_src: window.movieTrailer.state.trailer_src + results[i].key });
                //             window.movieTrailer.setState({ trailer_name: results[i].name });
                //             return;
                //         }
                //         else if (results[i].name.includes('Teaser') || results[i].name.includes('teaser')
                //             || results[i].type === 'Teaser' || results[i].type === 'teaser') {
                //             window.movieTrailer.setState({ movie_video: true });
                //             window.movieTrailer.setState({ movie_teaser: true });
                //             window.movieTrailer.setState({ movie_clip: false });
                //             window.movieTrailer.setState({ video_notfound: false });
                //             window.movieTrailer.setState({ trailer_src: window.movieTrailer.state.trailer_src + results[i].key });
                //             window.movieTrailer.setState({ trailer_name: results[i].name });
                //             return;
                //         }
                //         else {
                //             window.movieTrailer.setState({ movie_video: true });
                //             window.movieTrailer.setState({ movie_clip: true });
                //             window.movieTrailer.setState({ movie_teaser: false });
                //             window.movieTrailer.setState({ video_notfound: false });
                //             window.movieTrailer.setState({ trailer_src: window.movieTrailer.state.trailer_src + results[i].key });
                //             window.movieTrailer.setState({ trailer_name: results[i].name });
                //             return;
                //         }
                //     }
                // }
            });
    }

    redirectHome = () => {
        $(document).ready(() => {
            ReactDOM.render(<Movie />, document.getElementById('root'));
        });
    }

    redirectMovieDetails = () => {
        $(document).ready(() => {
            ReactDOM.render(<MovieDetails movieId={this.props.movieId} />, document.getElementById('root'));
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="videos"></div>
                    {/* <h1>{this.state.trailer_src}</h1>
                    {this.state.video_notfound ? <h3 className="text-center">Sorry! No trailer or any related videos are found for this movie!</h3> : null}
                    {this.state.movie_teaser ? <h3 className="text-center">Trailer not found. Watch teaser instead!</h3> : null}
                    {this.state.movie_clip ? <h3 className="text-center">Trailer/Teaser not found. Watch a video clip from the movie instead!</h3> : null}
                    <div className="text-center"><h3>{this.state.trailer_name}</h3></div>
                    {this.state.movie_video ?
                        <div className="intrinsic-container intrinsic-container-16x9">
                            <iframe title="YouTube video player" className="well center-block responsive" width="700" height="400" src={this.state.trailer_src} frameBorder="0" allowFullScreen allowtransparency="true" data-ratio="16:9"></iframe>
                        </div>
                        : 
                        <div className="img-responsive" style={{display: 'flex'}}>
                        <img id="notfoundimg" className="well" src={png} alt="img" />
                        </div>
                    } */}
                    <br />
                    <br/>
                    <div className="text-center btn-group btn-group-justified">
                        <i className="btn btn-primary" onClick={this.redirectHome}>Home</i>
                        <i className="btn btn-default" onClick={this.redirectMovieDetails}>Movie Details</i>
                    </div>
                    <br />
                </div>
            </div>


        );
    }
}

export default MovieVideo;
