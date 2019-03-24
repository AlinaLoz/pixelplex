import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to='https://pixelplex.io/' target="_blank">
        <img src={require('../assets/images/logo.png')} alt="pixelplex"/>
      </Link>
    </header>
  )
};

export default Header;