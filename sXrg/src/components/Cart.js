import React from "react";
import { connect } from "react-redux";
import currencySymbolGetter from "../functions/currencySymbolGetter";
import { mapStateToProps } from "../functions/mapStateToProps";
import { withParams } from "../functions/withParams";
import "./Cart.css";

class Cart extends React.Component {
  render() {
    return (
      <>
        <div className="centered__container">
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
                    {variant.attributes.map((attr) => {
                      if (attr.attribs.type === "text") {
                        return (
                          <div
                            title={attr.id}
                            className="cart__item__details__attribute source__sans__font"
                          >
                            {attr.attribs.value}
                          </div>
                        );
                      } else if (attr.attribs.type === "swatch") {
                        return (
                          <div
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
                  {console.log(variant)}
                  <img src={variant.images[0]} alt={variant.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(withParams(Cart));
