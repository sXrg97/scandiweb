import react from "react";
import { connect } from "react-redux";
import currencySymbolGetter from "../functions/currencySymbolGetter";
import { mapStateToProps } from "../functions/mapStateToProps";
import { withParams } from "../functions/withParams";
import { addCart, removeCart } from "../reducers/productActions";

class Variant extends react.Component {
	state = {
		currentImage: 0,
	};

	handleError = (currentImage) => {
		if (currentImage < this.props.variant.images.length)
			this.setState({
				currentImage: currentImage + 1,
			});
	};

	render() {
		return (
			<div key={this.props.idx} className="cartModal__singleItem__container">
				<div className="cartModal__singleItem__details">
					<div className="cartModal__singleItem__details__brandAndName text text_weight_300">
						<span>{this.props.variant.brand}</span>
						<br />
						<span>{this.props.variant.name}</span>
					</div>
					<div className="cartModal__singleItem__details__price">
						<span className="text text_weight_500">
							{currencySymbolGetter(this.props.currency.selectedCurrency)}
							{this.props.variant.prices.map((price, idx) =>
								price.currency === this.props.currency.selectedCurrency
									? (price.amount * this.props.variant.amount).toFixed(2)
									: ""
							)}
						</span>
					</div>
					<div className="cartModal__singleItem__details__attributes">
						{this.props.variant.attributes.map((variant_attr, idx) => {
							switch (variant_attr.attribs.type) {
								case "text":
									return (
										variant_attr.attribs && (
											<div
												key={`${idx}_text`}
												title={variant_attr.id}
												className={`button ${
													variant_attr.attribs.value.length < 3
														? "attr_button"
														: variant_attr.attribs.value.length < 4
														? "attr_button__medium"
														: "attr_button__large"
												}`}
											>
												{variant_attr.attribs.value}
											</div>
										)
									);
								case "swatch":
									return (
										<div
											key={`${idx}_swatch`}
											className="button attr_button swatch"
											style={{
												backgroundColor: variant_attr.attribs.value,
											}}
										></div>
									);
								default:
									<div></div>;
							}
						})}
					</div>
				</div>
				<div className="cartModal__singleItem__amount">
					<div
						className="button"
						onClick={() => {
							this.props.dispatch(
								addCart({
									name: this.props.variant.name,
									attributes: this.props.variant.attributes,
								})
							);
						}}
					>
						<div className="minus"></div>
						<div className="plus"></div>
					</div>
					<div className="text text_weight_500">
						{this.props.variant.amount}
					</div>
					<div
						className="button"
						onClick={() => {
							this.props.dispatch(
								removeCart({
									name: this.props.variant.name,
									attributes: this.props.variant.attributes,
								})
							);
						}}
					>
						<div className="minus"></div>
					</div>
				</div>
				<div className="cartModal__singleItem__images">
					<img
						className="cartModal__singleItem__img"
						src={this.props.variant.images[this.state.currentImage]}
						alt={this.props.variant.name}
						onError={() => {
							if (this.state.currentImage < this.props.variant.images.length)
								this.setState({
									currentImage: this.state.currentImage + 1,
								});
						}}
					/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(withParams(Variant));
