import React from 'react';
import Logo from '../../Assets/Images/logo.png';
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Logo} alt={'MyBurger'}/>
    </div>
);

export default logo;