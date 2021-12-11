import React from "react";
import { connect } from "react-redux";
import currencySymbolGetter from "../functions/currencySymbolGetter";
import getProduct from "../functions/getProduct";
import { mapStateToProps } from "../functions/mapStateToProps";
import { withParams } from "../functions/withParams";
import { addCart, removeCart, setProd } from "../reducers/productActions";
import "./Product.css";

class Product extends React.Component {
	state = {
		currentImage: null,
		attributes: {},
		name: null,
		prices: {},
	};

	async componentDidMount() {
		getProduct(this.props.params.productId).then((res) => {
			this.props.dispatch(setProd({ gotProductData: true, productData: res }));
			this.setState({
				currentImage: res.data.product.gallery[0],
			});
			//

			this.props.product.productData.data.product.attributes.map((attr) =>
				this.setState((prevState) => ({
					name: this.props.product.productData.data.product.name,
					attributes: {
						...prevState.attributes,
						[attr.name]: attr.items[0].id,
					},
				}))
			);
			console.log(
				"LOOK HERE",
				this.props.product.productData.data.product.prices
			);
			this.setState({
				prices: this.props.product.productData.data.product.prices,
			});
		});
	}

	componentWillUnmount() {
		this.props.product &&
			this.props.dispatch(setProd({ gotProductData: false, productData: [] }));
	}

	render() {
		const setBigImage = (image) => {
			this.setState({
				currentImage: image,
			});
		};

		return (
			<div className="product__container__wrapper">
				<div className="product__container">
					<div className="product">
						<div className="product__images">
							{this.props.product.gotProductData &&
								this.props.product.productData.data.product.gallery.map(
									(image) => (
										<div className="product__images__image" key={image}>
											<img
												onError={(event) =>
													(event.target.parentElement.style.display = "none")
												}
												onClick={() => {
													setBigImage(image);
												}}
												src={image}
												alt={this.props.product.productData.data.product.name}
											/>
										</div>
									)
								)}
						</div>
						<div className="product__big__image">
							{this.state.currentImage && (
								<img
									src={this.state.currentImage}
									alt={this.props.product.productData.data.product.name}
								/>
							)}
						</div>
						<div className="product__details__container">
							<h1 className="product__brand">
								{this.props.product.gotProductData &&
									this.props.product.productData.data.product.brand}
							</h1>
							<h2 className="product__name">
								{this.props.product.gotProductData &&
									this.props.product.productData.data.product.name}
							</h2>
							<div className="product__attributes">
								{console.log(this.props.product)}
								{this.props.product.gotProductData &&
									this.props.product.productData.data.product.attributes.map(
										(attribute) => (
											<>
												<div
													className="product__attribute__name"
													key={"product_" + attribute.id}
												>
													{attribute.name}:
												</div>
												{attribute.type === "text" ? (
													<div
														className="product__attribute__items"
														key={"text_" + attribute.id}
													>
														{attribute.items.map((item) => (
															<div
																className={`product__attribute__item__text ${
																	this.state.attributes[attribute.id] ===
																	item.id
																		? "selected"
																		: ""
																}`}
																key={item.id}
																title={item.displayValue}
																onClick={() =>
																	this.setState((prevState) => ({
																		attributes: {
																			...prevState.attributes,
																			[attribute.id]: item.id,
																		},
																	}))
																}
															>
																{item.value}
															</div>
														))}
													</div>
												) : attribute.type === "swatch" ? (
													<div
														className="product__attribute__items"
														key={"swatch_" + attribute.id}
													>
														{attribute.items.map((item) => (
															<div
																className={`product__attribute_item__swatch ${
																	this.state.attributes[attribute.id] ===
																	item.id
																		? "selected"
																		: ""
																}`}
																onClick={() =>
																	this.setState((prevState) => ({
																		attributes: {
																			...prevState.attributes,
																			[attribute.id]: item.id,
																		},
																	}))
																}
																key={"item_" + item.id}
																title={item.displayValue}
																style={{ backgroundColor: item.value }}
															></div>
														))}
													</div>
												) : (
													""
												)}
											</>
										)
									)}
							</div>
							<div className="product__price">
								<div className="product__attribute__name">Price:</div>
								<div className="produc__price__price">
									{currencySymbolGetter(this.props.currency.selectedCurrency)}
									{this.props.product.gotProductData &&
										this.props.product.productData.data.product.prices.map(
											(price) =>
												price.currency === this.props.currency.selectedCurrency
													? price.amount
													: ""
										)}
								</div>
							</div>
							<div
								className="product__addToCart"
								onClick={() => {
									this.props.dispatch(
										//leaving this here for the laughs... me trying for 3hrs to pass the props as an object instead of just passing the props.
										//guess I won't ever be confused about how redux works so it's a win in my book
										// addCart({
										// 	[this.props.product.productData.data.product.name]: {
										//     ...attributes,
										// 		attributes: [
										// 			{
										// 				variant: { ...this.state.attributes },
										// 				amount: 1,
										// 			},
										// 		],
										// 	},
										// })
										addCart({
											name: this.state.name,
											attributes: this.state.attributes,
											prices: this.state.prices,
											images:
												this.props.product.productData.data.product.gallery,
											brand: this.props.product.productData.data.product.brand,
										})
									);
								}}
							>
								Add To Cart{console.log(this.props.cart)}
							</div>
							<div
								className="product__addToCart"
								onClick={() => {
									this.props.dispatch(
										removeCart({
											name: this.state.name,
											attributes: this.state.attributes,
										})
									);
								}}
							>
								Remove From Cart{console.log(this.props.cart)}
							</div>
							{this.props.product.gotProductData && (
								<div
									className="product__description"
									dangerouslySetInnerHTML={{
										__html:
											this.props.product.productData.data.product.description,
									}}
								></div>
							)}
						</div>
					</div>
				</div>
				{console.log("cart is", this.props.cart)}
				{console.log("state is", this.state)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(withParams(Product));
