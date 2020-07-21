import React, { Component } from 'react';
import formatCurrency from '../util';

class Cart extends Component {
    state = {
        name: "",
        email: "",
        address: "",
        showCheckOut: false
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createOrder = (event) => {
        event.preventDefault();
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order)
    }

    render() {
        const { cartItems } = this.props
        return (
            <div>
                {
                    cartItems.length === 0 ?
                        (<div className="cart cart-header">Cart is Empty</div>) :
                        (<div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>)

                }

                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button className="button" onClick={() => this.props.removeFromCartItem(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "}
                                        {
                                            formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                            )}
                                    </div>
                                    <button onClick={() => {
                                        this.setState({ showCheckOut: true })
                                    }} className="button primary">
                                        Proceed
                            </button>
                                </div>
                            </div>
                             {
                                this.state.showCheckOut && (
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input type="email" name="email" onChange={this.handleInput} required />
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input type="text" name="name" onChange={this.handleInput} required />
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input name="address" type="text" onChange={this.handleInput} required />
                                                </li>
                                                <li>
                                                    <button type="submit" className="button primary" >Checkout</button>
                                                </li>

                                            </ul>
                                        </form>
                                    </div>

                                )} 
                        </div>
                    )}

                </div>
            </div>

        );
    }
}

export default Cart;