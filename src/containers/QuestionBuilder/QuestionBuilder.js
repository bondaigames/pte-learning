import React, { Component } from "react";
import DragDropFile from "../../components/DragDropFile/DragDropFile";
import DataInput from "../../components/DataInput/DataInput";
import InsertData from "../../components/InsertData/InsertData";
import { SHEET_ONE, SHEET_TWO } from "../../utils/Contants";
import _ from "lodash";
import OutTable from "../../components/OutTable/OutTable";

class QuestionBuilder extends Component {
  state = {
    file: {},
    data: {
      data: [],
      cols: []
    }
  };

  updatedFile = file => {
    this.setState({
      ...this.state,
      file: file
    });
  };

  updateData = data => {
    if (_.isEmpty(data.error)) {
      this.setState({
        ...this.state,
        data: data
      });
    } else {
      this.setState({
        ...this.state,
        data: data
      });
    }
  };

  render() {
    let alert = "";
    if (!_.isEmpty(this.state.data.message)) {
      alert = (
        <div className="alert alert-primary" role="alert">
          {this.state.data.message}
        </div>
      );
    }
    if (!_.isEmpty(this.state.data.error)) {
      alert = (
        <div className="alert alert-danger" role="alert">
          {this.state.data.error}
        </div>
      );
    }
    return (
      <React.Fragment>
        {alert}
        <h1>Question Builder</h1>
        <DragDropFile updatedFile={this.updatedFile}>
          <DataInput updatedFile={this.updatedFile} />
        </DragDropFile>

        <div>
          <InsertData
            file={this.state.file}
            sheet={SHEET_ONE}
            updatedData={this.updateData}
          >
            Insert WFD
          </InsertData>
          <InsertData
            file={this.state.file}
            sheet={SHEET_TWO}
            updatedData={this.updateData}
          >
            Insert RS
          </InsertData>
        </div>

        <OutTable
          data={this.state.data.data}
          cols={this.state.data.cols}
        ></OutTable>
      </React.Fragment>
    );
  }
}
export default QuestionBuilder;
