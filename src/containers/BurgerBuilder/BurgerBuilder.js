import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 0.5,
    bacon: 0.5,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const ingredientsChanged = {...this.state.ingredients};
        ingredientsChanged[type] = ingredientsChanged[type] + 1;
        this.setState((state, props) => ({
            ingredients: ingredientsChanged,
            totalPrice: INGREDIENT_PRICES[type] + state.totalPrice
        }));
    };

    removeIngredientHandler = (type) => {
        const ingredientsChanged = {...this.state.ingredients};
        if (ingredientsChanged[type] > 0) {
            ingredientsChanged[type] = ingredientsChanged[type] - 1;
            this.setState((state, props) => ({
                ingredients: ingredientsChanged,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[type]
            }));
        }
    };


    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls add={this.addIngredientHandler} remove={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;