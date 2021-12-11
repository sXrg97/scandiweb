import React from "react";
import "./Header.css";
import logo from "../img/a-logo.png";
import { ReactComponent as CartSVG } from "../img/cart.svg";
import { Link } from "react-router-dom";
import { withParams } from "../functions/withParams";
import { mapStateToProps } from "../functions/mapStateToProps";
import { connect } from "react-redux";
import {
	setCurr,
	toggleCurrency,
	toggleCartModal,
	closeCartModal,
} from "../reducers/productActions";
import { ReactComponent as CaretUp } from "../img/caret-up.svg";
import currencySymbolGetter from "../functions/currencySymbolGetter";
import { closeCart, toggleCart } from "../reducers/actionNames";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gotData: false,
			data: [],
		};
	}

	getData = () => {
		const DATA = `
  {
    categories {
      name
    }
    currencies
  }
  `;
		fetch("http://localhost:4000/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: DATA }),
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					...this.state,
					gotData: true,
					data: data,
				});
			})
			.catch((err) => console.error("Error: ", err));
	};

	componentDidMount() {
		this.getData();
	}
	render() {
		return (
			<>
				<div className="header__wrapper">
					<div className="header">
						<div className="header__element left">
							<Link
								to={"/category/all"}
								key={"all"}
								className={"header__category"}
							>
								All
							</Link>
							{this.state.gotData ? (
								this.state.data.data.categories.map((category) => (
									<Link
										to={"category/" + category.name}
										key={category.name}
										className="header__category"
									>
										{category.name}
									</Link>
								))
							) : (
								<div>Loading...</div>
							)}
						</div>
						<div className="header__element center">
							<img src={logo} alt="ScandiWeb"></img>
						</div>
						<div className="header__element right">
							<div
								onClick={() => {
									this.props.dispatch(toggleCurrency({}));
								}}
								className={`currency__wrapper ${
									this.props.currency.isCurrencyModalOpen ? "open" : ""
								}`}
							>
								<div className="currency">
									{currencySymbolGetter(this.props.currency.selectedCurrency)}
								</div>
								<div className="caret">
									<CaretUp />
								</div>
								<div className="currency__modal">
									{this.state.gotData &&
										this.state.data.data.currencies.map((currency) => (
											<div
												className="currency__choice"
												key={currency}
												onClick={() => {
													this.props.dispatch(setCurr({ currency: currency }));
												}}
											>
												{currencySymbolGetter(currency)} {currency}
											</div>
										))}
								</div>
							</div>
							<div
								className="cart"
								onClick={() => {
									this.props.dispatch(toggleCartModal());
								}}
							>
								<div className="cartSVGwrapper">
									<CartSVG fill="#43464e" />
									<div className="cartItemsNumber">
										{this.props.cart.list.variants.length}
									</div>
								</div>
							</div>
							{this.props.cart.isCartModalOpen && (
								<div className="cartModal">
									<div className="cartModal__info">
										My bag,{" "}
										<span className="cartModal__info__items">
											{this.props.cart.list.variants.length}{" "}
											{this.props.cart.list.variants.length === 1
												? "item"
												: "items"}
										</span>
									</div>
									<div className="cartModal__items__container">
										{console.log("carttttt", this.props.cart)}
										{this.props.cart.list.variants.map((variant) => (
											<div className="cartModal__singleItem__container">
												<div className="cartModal__singleItem__details">
													<div className="cartModal__singleItem__details__brandAndName text text_weight_300">
														<span>{variant.brand}</span>
														<br />
														<span>{variant.name}</span>
													</div>
													<div className="cartModal__singleItem__details__price">
														<span class="text text_weight_500">
															{currencySymbolGetter(
																this.props.currency.selectedCurrency
															)}
															{variant.prices.map((price) =>
																price.currency ===
																this.props.currency.selectedCurrency
																	? price.amount
																	: ""
															)}
														</span>
													</div>
													<div className="cartModal__singleItem__details__attributes"></div>
												</div>
												<div className="cartModal__singleItem__amount">
													<div className="button">
														<div className="minus"></div>
														<div className="plus"></div>
													</div>
													<div className="text text_weight_500">
														{variant.amount}
													</div>
													<div className="button">
														<div className="minus"></div>
													</div>
												</div>
												<div className="cartModal__singleItem__images">
													<img
														className="cartModal__singleItem__img"
														src={variant.images[0]}
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				{this.props.cart.isCartModalOpen && (
					<>
						<div
							className="cartBackdrop"
							onClick={() => {
								this.props.dispatch(closeCartModal());
							}}
						></div>
					</>
				)}
			</>
		);
	}
}

export default connect(mapStateToProps)(withParams(Header));
