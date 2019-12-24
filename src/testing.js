import React, { Component } from "react";
import aws from "aws-sdk";
import _ from "lodash";
// import hello from "./hello";

class Testing extends Component {
  state = {
    data: {}
  };

  aaaaa = () => {
    // Initialize the Amazon Cognito credentials provider
    aws.config.region = "us-east-1"; // Region
    aws.config.credentials = new aws.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-1:d5d669e3-9ee1-4800-b557-22bc486537ba"
    });

    // Create a new AWS Polly object
    var polly = new aws.Polly();

    // polly.describeVoices(function(err, data) {
    //   if (err) console.log(err, err.stack);
    //   // an error occurred
    //   else {
    //     // console.log(data); // successful response
    //   }
    // });

    var params = {
      OutputFormat: "mp3", // You can also specify pcm or ogg_vorbis formats.
      Text: "I am Big head and I am crazy person.", // This is where you'll specify whatever text you want to render.
      TextType: "text",
      VoiceId: "Joanna" // Specify the voice ID / name from the previous step.
    };

    const saveMp3 = (err, data) => {
      if (err) {
        console.log(err, err.stack);
      }
      // an error occurred
      else {
        // console.log(data); // successful response
        this.setState({ data: data });
      }
    };

    polly.synthesizeSpeech(params, saveMp3);
  };

  render() {
    let test = "";
    // console.log(this.state.data);
    if (!_.isEmpty(this.state.data)) {
      //   console.log("testing");
      //   console.log(this.state.data);
      let base64String =
        "data:" +
        this.state.data.ContentType +
        ";base64," +
        btoa(String.fromCharCode(...this.state.data.AudioStream));

      test = (
        <div>
          <audio controls>
            <source
              src={base64String}
              type={this.state.data.ContentType}
            ></source>
          </audio>
        </div>
      );
      //   test = (
      //     <audio
      //       src={this.state.data}
      //       preload="auto"
      //       style="width: 100%; height: 100%;"
      //     ></audio>
      //   );
    }
    return (
      <div>
        <button type="button" className="btn btn-dark" onClick={this.aaaaa}>
          Click here please
        </button>
        {test}
      </div>
    );
  }
}
export default Testing;
