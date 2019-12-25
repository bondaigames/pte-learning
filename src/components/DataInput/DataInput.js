import React, { Component } from "react";

class DataInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    const files = e.target.files;
    if (files && files[0]) {
      console.log(files[0]);
      this.props.updatedFile(files[0]);
    }
  };

  render() {
    return (
      <form>
        <div className="form-group text-center">
          <label>Spreadsheet: </label>
          <input
            type="file"
            id="file"
            className="border rounded-0"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");

export default DataInput;
