import React, { Component } from "react";
import Player from "../../components/Player/Player";

class WFDPractice extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="text-left">
          <button class="btn btn-secondary mr-3" type="button">
            Show Answer
          </button>
          <div class="alert alert-success" role="alert">
            <span>
              <strong>Alert</strong> text.
            </span>
          </div>
        </div>
        <Player></Player>
      </React.Fragment>
    );
  }
}
export default WFDPractice;
