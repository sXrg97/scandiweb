import React from "react";
import { withParams } from "../functions/withParams";
import { mapStateToProps } from "../functions/mapStateToProps";
import { connect } from "react-redux";
import "./Category.css";
import { addCart, set } from "../reducers/productActions";
import getData from "../functions/getData";
import { Link } from "react-router-dom";
import { ReactComponent as CartSVG } from "../img/cart.svg";
import currencySymbolGetter from "../functions/currencySymbolGetter";

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			params: this.props.params.category,
			attributes: [],
		};
	}

	handleResize() {
		document
			.querySelectorAll(".category__product__img img")
			.forEach((element) => {
				const width = element.offsetWidth;
				const addBtn = element.parentElement.parentElement.previousSibling;
				addBtn.style.top = width - 15 + "px";
			});
	}

	async componentDidMount() {
		getData(this.props.params.category).then((data) => {
			this.props.dispatch(set({ gotData: true, data: data }));
		});

		// This might reduce performance
		window.addEventListener("resize", this.handleResize);
	}

	async componentDidUpdate(prevProps) {
		if (this.state.params !== this.props.params.category) {
			this.setState((state, props) => {
				return { ...state, params: props.params.category };
			});
		}

		getData(this.props.params.category).then((data) => {
			if (this.props.params.category !== prevProps.params.category)
				this.props.dispatch(set({ gotData: true, data: data }));
		});
		this.handleResize();
	}

	componentWillUnmount() {
		this.props.products &&
			this.props.dispatch(set({ gotData: false, data: [] }));
	}

	render() {
		return (
			<div className="category">
				<div className="category__name"> {this.props.params.category}</div>
				<div className="products">
					{this.props.products.gotData &&
						this.props.products.data.data.category.products.map((product) => {
							return (
								<div
									className={`category__product__card ${
										product.inStock ? "" : "notInStock"
									}`}
									key={product.id}
								>
									<div
										className="addToCartBtn"
										onClick={() => {
											let thisProductDefaultAttribs = [];
											product.attributes.map((attr) => {
												thisProductDefaultAttribs.push({
													id: attr.id,
													attribs: {
														id: attr.items[0].id,
														type: attr.type,
														displayValue: attr.items[0].displayValue,
														value: attr.items[0].value,
													},
												});
											});
											this.props.dispatch(
												addCart({
													name: product.name,
													attributes: thisProductDefaultAttribs,
													prices: product.prices,
													images: product.gallery,
													brand: product.brand,
													allAttributes: product.attributes,
													selectedImage: 0,
												})
											);
										}}
									>
										<CartSVG fill="#fff" />
									</div>
									<Link className="link" to={`/product/${product.id}`}>
										<div className="category__product__img">
											<img src={product.gallery[0]} alt={product.name} />
											{product.inStock ? (
												""
											) : (
												<div className="notInStockOverlay">Out of stock</div>
											)}
										</div>
										<div className="category__product__content">
											<div
												className={`category__product__name ${
													product.inStock ? "" : "notInStock"
												}`}
											>
												{product.brand} {product.name}
											</div>
											<div
												className={`category__product__price ${
													product.inStock ? "" : "notInStock"
												}`}
											>
												{currencySymbolGetter(
													this.props.currency.selectedCurrency
												)}
												{product.prices.map((price) =>
													price.currency ===
													this.props.currency.selectedCurrency
														? price.amount
														: ""
												)}
											</div>
										</div>
									</Link>
								</div>
							);
						})}
				</div>
				{console.log("category", this.props)}
			</div>
		);
	}
}

export default connect(mapStateToProps)(withParams(Category));
