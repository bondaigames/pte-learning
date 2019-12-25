import React, { Component } from "react";
import _ from "lodash";

class OutTable extends Component {
  render() {
    let rows = "",
      cols = "";
    if (_.isArray(this.props.data) && _.isArray(this.props.cols)) {
      rows = Object.keys(this.props.data).map(key => {
        if (key !== "createdDate") {
          return (
            <tr key={key}>
              {this.props.data[key].map((r, i) => (
                <td key={key + i}>{r}</td>
              ))}
            </tr>
          );
        }
        return null;
      });

      cols = this.props.cols.map(c => <th key={c.key}>{c.name}</th>);
    }

    return _.isEmpty(rows) || _.isEmpty(cols) ? (
      ""
    ) : (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>{cols}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default OutTable;
