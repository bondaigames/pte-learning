import React, { Component } from "react";
import Player from "../../components/Player/Player";
import axiosServer from "../../axios/pte-server/axios-pte-server";

class WFDPractice extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.loadData("test", "test");
  }

  loadData = (fileName, text) => {
    const params = {
      fileName: "cmt.mp3",
      text:
        "Text messages are used for personal, family, business and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages has become an accepted part of many cultures"
    };
    axiosServer
      .post("/wfd", params)
      .then(response => {
        console.log("testing: ", response.data);
        this.setState({ data: response.data });
        console.log("after testing: ", this.state.data);
        // const blob = new Blob([response.AudioStream], {
        //   type: response.ContentType
        // });
        // const url = window.URL.createObjectURL(blob);
      })
      .catch(error => {
        console.log("error inserting");
      });
  };
  render() {
    // this.props.updateData(data, cols);
    // this.setState({
    //   loading: false
    // });
    return (
      <React.Fragment>
        <div className="text-left">
          <button className="btn btn-secondary mr-3" type="button">
            Show Answer
          </button>
          <div className="alert alert-success" role="alert">
            <span>
              <strong>Alert</strong> text.
              {/* {this.loadData("test", "test")} */}
            </span>
          </div>
        </div>
        <Player source={this.state.data}></Player>
      </React.Fragment>
    );
  }
}
export default WFDPractice;
