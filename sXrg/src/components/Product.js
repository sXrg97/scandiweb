import React from "react";
import { connect } from "react-redux";
import currencySymbolGetter from "../functions/currencySymbolGetter";
import getProduct from "../functions/getProduct";
import { mapStateToProps } from "../functions/mapStateToProps";
import { withParams } from "../functions/withParams";
import { setProd } from "../reducers/productActions";
import "./Product.css";

class Product extends React.Component {
  state = {
    currentImage: null,
  };

  async componentDidMount() {
    getProduct(this.props.params.productId).then((res) => {
      this.props.dispatch(setProd({ gotProductData: true, productData: res }));
      this.setState({
        currentImage: res.data.product.gallery[0],
      });
      //

      this.props.product.productData.data.product.attributes.map((attr) =>
        this.setState({ [attr.id]: attr.items[0].id })
      );

      //
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
                                  this.state[attribute.id] === item.id
                                    ? "selected"
                                    : ""
                                }`}
                                key={item.id}
                                title={item.displayValue}
                                onClick={() =>
                                  this.setState({ [attribute.id]: item.id })
                                }
                              >
                                {item.value}
                                {console.log("item.id:", item.id)}
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
                                  this.state[attribute.id] === item.id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  this.setState({ [attribute.id]: item.id })
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
              <div className="product__addToCart">Add To Cart</div>
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
        {console.log("STATE IS: ", this.state)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withParams(Product));
