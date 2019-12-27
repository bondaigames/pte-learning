import React, { Component } from "react";
import { Link } from "react-router-dom";

class Service extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <div className="card">
              <div className="card-body">
                <i className="fas fa-headphones-alt"></i>
                <h4 className="card-title">
                  <Link
                    to={this.props.link}
                    className="text-decoration-none"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <div className="portfolio-caption">
                      <h4>{this.props.children}</h4>
                    </div>
                  </Link>
                </h4>
                <h6 className="text-muted card-subtitle mb-2">
                  {this.props.subtitle}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Service;
