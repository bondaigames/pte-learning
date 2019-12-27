import React, { Component } from "react";
import Navigation from "../../components/UI/Navigation/Navigation";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation></Navigation>
        <div className="container text-center">{this.props.children}</div>
      </React.Fragment>
    );
  }
}
export default Layout;
