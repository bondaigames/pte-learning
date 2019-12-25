import React, { Component } from "react";

class Dropdown extends Component {
  state = {
    listOpen: false,
    headerTitle: this.props.title
  };

  selectItem = (title, id, stateKey) => {
    this.setState(
      {
        headerTitle: title,
        listOpen: false
      },
      this.props.toggleSelected(id, stateKey)
    );
  };

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="dropdown mr-1">
          <button
            className="btn btn-secondary"
            data-toggle="dropdown"
            aria-expanded={this.state.listOpen}
            type="button"
            onClick={this.toggleList}
          >
            {this.state.headerTitle}
          </button>
          <div
            role="menu"
            className={
              this.state.listOpen ? "dropdown-menu show" : "dropdown-menu"
            }
          >
            {this.props.list.map(item => (
              <a
                role="presentation"
                className="dropdown-item"
                key={item.id}
                onClick={() => this.selectItem(item.title, item.id, item.key)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dropdown;
