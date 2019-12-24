import React, { Component } from "react";
import axiosServer from "../../axios/pte-server/axios-pte-server";
import _ from "lodash";

class ConvertTextToSpeech extends Component {
  state = {
    data: {}
  };

  convertText = () => {
    if (!_.isEmpty(this.props.fileName) && !_.isEmpty(this.props.text))
      this.loadTextToAudio(this.props.fileName, this.props.text);
  };

  loadTextToAudio = (fileName, text) => {
    const params = {
      fileName: fileName,
      text: text
    };

    axiosServer
      .post("/wfd", params)
      .then(response => {
        this.setState({ data: response.data });
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
    let audioElement = "";
    if (!_.isEmpty(this.state.data)) {
      let base64String =
        "data:" +
        this.state.data.ContentType +
        ";base64," +
        btoa(String.fromCharCode(...this.state.data.AudioStream.data));

      audioElement = (
        <div>
          <audio controls>
            <source
              src={base64String}
              type={this.state.data.ContentType}
            ></source>
          </audio>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.convertText}
          >
            Click here please
          </button>
        </div>
        <div>{audioElement}</div>
      </React.Fragment>
    );
  }
}

export default ConvertTextToSpeech;
