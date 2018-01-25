import React, { Component } from 'react';
import '../../css/custom-style.css';


class Header extends Component {
    render() {
        return (
            <div className="jumbotron" style={{backgroundColor:'#FFFFFF'}}>
                <nav className="navbar navbar-default navbar-fixed-top" style={{ borderColor: '#3B3350', backgroundColor: '#3B3350' }}>
                    <div className="navbar-header">
                        <a  style={{color:'aqua'}}className="navbar-brand" href="index.html" >Home</a>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;