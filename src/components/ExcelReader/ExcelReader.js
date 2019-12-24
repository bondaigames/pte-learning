import React, { Component } from "react";
import XLSX from "xlsx";
import DragDropFile from "../DragDropFile/DragDropFile";
import DataInput from "../DataInput/DataInput";
import OutTable from "../OutTable/OutTable";
import InsertData from "../InsertData/InsertData";
import ConvertTextToSpeech from "../ConvertTextToSpeech/ConvertTextToSpeech";

class ExcelReader extends Component {
  state = {
    file: {},
    data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
    cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     file: {},
  //     data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
  //     cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
  //   };
  //   this.handleFile = this.handleFile.bind(this);
  //   // this.exportFile = this.exportFile.bind(this);
  // }

  handleChange = files => {
    this.setState({
      ...this.state,
      data: [],
      cols: []
    });
    if (files && files[0]) this.setState({ file: files[0] });
  };

  updateData = (data, cols) => {
    console.log(data, cols);
    //this.setState({ data: data, cols: cols });
  };

  // handleFile = (file /*:File*/) => {
  //   /* Boilerplate to set up FileReader */
  //   const reader = new FileReader();
  //   const rABS = !!reader.readAsBinaryString;
  //   reader.onload = e => {
  //     /* Parse data */
  //     const bstr = e.target.result;
  //     const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
  //     /* Get first worksheet */
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     /* Convert array of arrays */
  //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  //     /* Update state */
  //     this.setState({ data: data, cols: make_cols(ws["!ref"]) });
  //   };
  //   if (rABS) reader.readAsBinaryString(file);
  //   else reader.readAsArrayBuffer(file);
  // };

  handleFile = (sheet, callback /*:File*/) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[sheet];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (data.length > 0) {
        /* Update state */
        this.setState({ data: data, cols: make_cols(ws["!ref"]) });
      } else {
        this.setState({
          ...this.state,
          data: [],
          cols: []
        });
      }
      callback(this.state.data, this.state.cols);
    };
    if (rABS) reader.readAsBinaryString(this.state.file);
    else reader.readAsArrayBuffer(this.state.file);
  };

  render() {
    return (
      <DragDropFile handleChange={this.handleChange}>
        <div className="row">
          <div className="col-xs-12">
            <DataInput handleChange={this.handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="btn-toolbar">
              <InsertData
                sheet="0"
                handleFile={this.handleFile}
                updateData={this.updateData}
              >
                Insert WFD
              </InsertData>
              <div className="mr-3"></div>
              <InsertData
                sheet="1"
                handleFile={this.handleFile}
                updateData={this.updateData}
              >
                Insert RS
              </InsertData>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ConvertTextToSpeech
              fileName="helloworld.mp3"
              text="Big head is so crazy and she need to go to eat shit."
            ></ConvertTextToSpeech>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div> */}
        <div className="row">
          <div className="col-xs-12">
            <OutTable data={this.state.data} cols={this.state.cols} />
          </div>
        </div>
      </DragDropFile>
    );
  }
}

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export default ExcelReader;
