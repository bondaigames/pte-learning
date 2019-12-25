import React, { Component } from "react";

class OutTable extends Component {
  render() {
    const rows = Object.keys(this.props.data).map(key => {
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

    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {this.props.cols.map(c => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default OutTable;
