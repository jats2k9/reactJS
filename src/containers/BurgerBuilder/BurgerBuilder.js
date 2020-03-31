import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosInstance from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.2,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        loading: false,
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
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

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Toff',
                country: 'USA'
            },
            deliveryMethod: 'fastest'
        };
        axiosInstance.post('/orders', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });


    };

    render() {
        let orderSummary = <OrderSummary
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            purchasedCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />;
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);