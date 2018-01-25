import React from 'react';
import ReactDOM from 'react-dom';
import './css/custom-style.css';
import Movie from './Components/Movie/Movie';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

ReactDOM.render(<Movie />, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
ReactDOM.render(<Header />,document.getElementById('header'));
