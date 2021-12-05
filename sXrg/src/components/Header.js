import React from "react";
import "./Header.css";
import logo from "../img/a-logo.png";
import { ReactComponent as CartSVG } from "../img/cart.svg";
import { Link } from "react-router-dom";
import { withParams } from "../functions/withParams";
import { mapStateToProps } from "../functions/mapStateToProps";
import { connect } from "react-redux";
import { setCurr, toggleCurrency } from "../reducers/productActions";
import { ReactComponent as CaretUp } from "../img/caret-up.svg";
import currencySymbolGetter from "../functions/currencySymbolGetter";

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
            <CartSVG fill="#43464e" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withParams(Header));
