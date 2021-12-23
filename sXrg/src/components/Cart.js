import React from "react";
import { connect } from "react-redux";
import currencySymbolGetter from "../functions/currencySymbolGetter";
import { mapStateToProps } from "../functions/mapStateToProps";
import { withParams } from "../functions/withParams";
import { ReactComponent as CaretLeft } from "../img/caret-left.svg";
import { ReactComponent as CaretRight } from "../img/caret-right.svg";
import { updateIMG } from "../reducers/productActions";
import "./Cart.css";

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lastImageAction: "increase",
		};
	}

	componentDidMount() {
		this.props.cart.list.variants.map((variant) => {
			this.setState((prevState) => ({
				...prevState,
				[variant.name]: [],
			}));
		});
		this.props.cart.list.variants.map((variant) => {
			this.setState((prevState) => ({
				...prevState,
				[variant.name]: [
					...prevState[variant.name],
					{ variantAttribs: variant.attributes, imageErrors: 0 },
				],
			}));
		});
	}

	render() {
		return (
			<>
				<div className="centered__container cartpage">
					<h1 className="cart__title text text_weight_700">Cart</h1>
					<div className="cart__items">
						{this.props.cart.list.variants.map((variant) => (
							<div className="cart__item">
								<div className="cart__item__details">
									<div className="cart__item__details__namecontainer">
										<div className="cart__item__details__brand text text_weight_600">
											{variant.brand}
										</div>
										<div className="cart__item__details__name text">
											{variant.name}
										</div>
									</div>
									<div className="cart__item__details__price text text_weight_700">
										{currencySymbolGetter(this.props.currency.selectedCurrency)}
										{variant.prices.map((price) =>
											price.currency === this.props.currency.selectedCurrency
												? (price.amount * variant.amount).toFixed(2)
												: ""
										)}
									</div>
									<div className="cart__item__details__attributes">
										{variant.attributes.map((attr, idx) => {
											if (attr.attribs.type === "text") {
												return (
													<div
														key={`${idx}_text`}
														title={attr.id}
														className="cart__item__details__attribute source__sans__font"
													>
														{attr.attribs.value}
													</div>
												);
											} else if (attr.attribs.type === "swatch") {
												return (
													<div
														key={`${idx}swatch`}
														title={attr.id}
														className="cart__item__details__attribute"
														style={{
															backgroundColor: attr.attribs.value,
														}}
													></div>
												);
											} else {
												console.error(
													"Attribute type not found, check Cart.js component"
												);
												return <div></div>;
											}
										})}
									</div>
								</div>
								<div className="cart__item__buttons"></div>
								<div className="cart__item__photos">
									<img
										src={variant.images[variant.selectedImage]}
										alt={variant.name}
										onError={() => {
											//TODO: check if variant imageErrors isn't higher than images.length
											if (this.state.lastImageAction === "decrease") {
												this.props.dispatch(
													updateIMG({
														variant: { ...variant },
														increase: false,
													})
												);
												//TODO: Define variables for state to be changed
												this.setState((prevState) => ({
													//TODO: change state image errors
												}));
											} else {
												this.props.dispatch(
													updateIMG({
														variant: { ...variant },
														increase: true,
													})
												);
											}
										}}
									/>
									<div
										className="photoSlider left"
										onClick={() => {
											this.props.dispatch(
												updateIMG({
													variant: { ...variant },
													increase: false,
												})
											);
											//TODO: Do the same as above
											this.setState({
												lastImageAction: "decrease",
											});
										}}
									>
										<CaretLeft />
									</div>
									<div
										className="photoSlider right"
										onClick={() => {
											this.props.dispatch(
												updateIMG({
													variant: { ...variant },
													increase: true,
												})
											);
											this.setState({
												lastImageAction: "increase",
											});
										}}
									>
										<CaretRight />
									</div>
								</div>
							</div>
						))}
					</div>
					<button
						onClick={() => {
							console.log(this.state);
						}}
					>
						state
					</button>
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps)(withParams(Cart));
