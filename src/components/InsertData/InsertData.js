import React, { Component } from "react";
import axiosFirebase from "../../axios/pte-firebase/axios-pte-firebase";
// import axiosServer from "../../axios/pte-server/axios-pte-server";
import _ from "lodash";
import { readExcelFile } from "../../utils/Utils";

class InsertData extends Component {
  state = {
    error: ""
  };
  insertDataToDatabase = e => {
    console.log("file: ", !_.isEmpty(this.props.file.name));
    if (!_.isEmpty(this.props.file.name) && !_.isEmpty(this.props.sheet)) {
      readExcelFile(this.props.file, this.props.sheet, callback => {
        if (callback.error !== null) {
          console.log(callback);
          this.insertWFDQuestionBank(callback.data, callback.cols);
          return;
        }
        // this.setState({ error: callback.error });
      });
    } else {
      this.props.updatedData({ error: "There is no file uploaded" });
    }
  };

  insertWFDQuestionBank = (data, cols) => {
    // console.log(cols);
    if (data.length > 0) {
      // const data1 = JSON.stringify(data);
      // console.log(data1);
      const updatedData = {
        ...data,
        createdDate: new Date()
      };

      axiosFirebase
        .post("/wfd.json", updatedData)
        .then(response => {
          const updatedData = {
            data: JSON.parse(response.config.data),
            cols: cols,
            message: "Inserted data successfuly"
          };
          this.props.updatedData(updatedData);
          // const params = {
          //   fileName: "bighead.mp3",
          //   text: "Big head is so crazy and she need to go to eat shit."
          // };
          // axiosServer
          //   .post("/wfd", params)
          //   .then(response => {
          //     this.setState({ data: response.data });
          //     // const blob = new Blob([response.AudioStream], {
          //     //   type: response.ContentType
          //     // });
          //     // const url = window.URL.createObjectURL(blob);
          //   })
          //   .catch(error => {
          //     console.log("error inserting");
          //   });
          // this.props.updateData(data, cols);
          // this.setState({
          //   loading: false
          // });
          // this.props.history.push("/");
        })
        .catch(error => {
          this.props.updatedData({ error: "Something went wrong" });
        });
    }
  };

  render() {
    let test = "";
    // console.log(this.state.data);
    if (!_.isEmpty(this.state.data)) {
      console.log(this.state.data);
      let base64String =
        "data:" +
        this.state.data.ContentType +
        ";base64," +
        btoa(String.fromCharCode(...this.state.data.AudioStream.data));

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
    }
    return (
      <React.Fragment>
        <button
          className="btn btn-secondary mr-3"
          type="button"
          onClick={this.insertDataToDatabase}
        >
          {this.props.children}
        </button>
        {/* <button
          type="button"
          className="btn btn-dark"
          onClick={this.insertDataToDatabase}
        >
          {this.props.children}
        </button> */}
      </React.Fragment>
    );
  }
}
export default InsertData;
