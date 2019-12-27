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
          //remove all empty object
          const newArray = callback.data.filter(
            value => Object.keys(value).length !== 0
          );
          // const getNewestData = newArray.reverse();
          this.insertWFDQuestionBank(newArray, callback.cols);
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
          const resJSON = JSON.parse(response.config.data);
          // console.log("response.config.data:", resJSON);
          // const reverseKeys = Object.keys(resJSON).reverse();
          // let reveseData1 = {};
          // for (let key in reverseKeys) {
          //   Object.assign({ [key]: resJSON[key] }, reveseData1);
          // const reveseData2 = { [key]: resJSON[key] };
          // reveseData1 = { ...reveseData1, ...reveseData2 };
          // console.log("reversedadsadsasa:", reveseData1);
          // }
          // reverseKeys.map(key => {
          //   console.log("key reverse:", key, resJSON[key]);
          //   reveseData1 = { ...reveseData1, [key]: resJSON[key] };
          //   console.log("reveseData1", reveseData1);
          // });
          // console.log(reverseKeys);
          // console.log("reverse:", reveseData1);

          const updatedData = {
            data: resJSON,
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
          this.props.updatedData({ error: error.message });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-secondary mr-3"
          type="button"
          onClick={this.insertDataToDatabase}
        >
          {this.props.children}
        </button>
      </React.Fragment>
    );
  }
}
export default InsertData;
