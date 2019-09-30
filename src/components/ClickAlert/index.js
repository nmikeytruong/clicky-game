import React, { Component } from "react";
import "./style.css";

class ClickAlert extends Component {
  state = {
    alert: "",
    animating: false
  };

  componentDidUpdate({ score, topScore }, prevState) {
    const newState = { animating: true };

    if (score === 0 && topScore === 0) {
      newState.alert = "";
    } else if (score === 0 && topScore > 0) {
      newState.alert = "incorrect";
    } else {
      newState.alert = "correct";
    }

    if (score !== this.props.score || this.state.alert !== newState.alert) {
      this.setState(newState);
    }
  }

  renderAlert = () => {
    switch (this.state.alert) {
    case "correct":
      return "You caught'em!";
    case "incorrect":
      return "Sorry, that's the second time!";
    default:
      return "Click/catch a pokemon to begin!";
    }
  };

  render() {
    return (
      <li
        className={this.state.animating ? this.state.alert : ""}
        onAnimationEnd={() => this.setState({ animating: false })}
      >
        {this.renderAlert()}
      </li>
    );
  }
}

export default ClickAlert;
