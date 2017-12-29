import React, { Component } from 'react';
import './App.css';
import jpg from './Images/HKK.JPG';

class Footer extends Component {
  render() {
    var img_alt = "https://upload.wikimedia.org/wikipedia/en/d/d1/Image_not_available.png";
    return (
      <div className="Footer jumbotron">
        <div className="footer-1 col-md-4 hidden-sm hidden-xs">
          <img  id='myImage' src={jpg} onerror={img_alt} style={{height:'300px', width:'300px', borderRadius: '150px'}}/>
        </div>
        <div className="footer2 col-md-8" style={{textAlign:'center'}}>
          <p><a href="mailto:harikrushna2009@gmail.com?Subject=Hello%20there!" target="_top"><i className="fa fa-envelope i-hov" aria-hidden="true"/> harikrushna2009@gmail.com</a></p>
          <p><a href="https://www.linkedin.com/in/hari-krushna-566a68132/" target="_blank" rel="noopener noreferrer" className="footer-link"><i className="fa fa-linkedin-square i-hov" aria-hidden="true"/> Linkedin</a></p>
          <p><a href="https://github.com/hari-krushna" target="_blank" rel="noopener noreferrer"><i className="fa fa-github i-hov" aria-hidden="true"/> Github</a></p>
          <p>Made with <span role="img">❤️</span> by <strong>Hari Krushna</strong> using React, JavaScript, Bootstrap and custom CSS</p>
          <p>Check out the repo <strong><a href="https://github.com/hari-krushna/movie-app" target="_blank" rel="noopener noreferrer">here on github</a></strong> © 2017</p>
        </div>
     
      </div>
    );
  }
}

export default Footer;