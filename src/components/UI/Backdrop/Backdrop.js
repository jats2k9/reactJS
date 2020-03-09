import classes from './BackDrop.css';
import React from 'react';

const backDrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backDrop;