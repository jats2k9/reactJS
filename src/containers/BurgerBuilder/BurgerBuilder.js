import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.2,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(
            (ingredient) => (ingredients[ingredient]))
            .reduce((prev, curr) => (prev + curr), 0);
        return sum > 0;
    };

    addIngredientHandler = (type) => {
        const ingredientsChanged = {...this.state.ingredients};
        ingredientsChanged[type] = ingredientsChanged[type] + 1;
        this.setState((state, props) => ({
            ingredients: ingredientsChanged,
            totalPrice: INGREDIENT_PRICES[type] + state.totalPrice,
            purchasable: this.updatePurchaseState(ingredientsChanged)
        }));

    };

    removeIngredientHandler = (type) => {
        const ingredientsChanged = {...this.state.ingredients};
        if (ingredientsChanged[type] > 0) {
            ingredientsChanged[type] = ingredientsChanged[type] - 1;
            this.setState((state, props) => ({
                ingredients: ingredientsChanged,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[type],
                purchasable: this.updatePurchaseState(ingredientsChanged)
            }));
        }
    };

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;