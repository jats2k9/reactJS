import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => {
            return <BuildControl key={ctrl.label} label={ctrl.label} add={() => props.add(ctrl.type)}
                                 remove={() => props.remove(ctrl.type)} disabled={props.disabled[ctrl.type]}/>
        })}
    </div>
);

export default buildControls;