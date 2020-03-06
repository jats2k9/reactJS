import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            'bread-top': 1,
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
            'bread-bottom': 1
        }
    };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls/>
            </Aux>
        );
    }
}

export default BurgerBuilder;