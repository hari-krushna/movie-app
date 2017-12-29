import React, { Component } from 'react';
import './App.css';


class Header extends Component {
    render() {
        return (
            <div className="jumbotron" style={{backgroundColor:'#FFFFFF'}}>
                <nav className="navbar navbar-default navbar-fixed-top" style={{ borderColor: 'black', backgroundColor: 'black' }}>
                    <div className="navbar-header">
                        <a  style={{color:'aqua'}}className="navbar-brand" href="index.html" >Home</a>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;