import React, { Component } from "react";
import Nav from "../Nav";
import Header from "../Header";
import Container from "../Container";
import ClickItem from "../ClickItem";
import clickee from "../../clickee.json";

class ClickyGame extends Component {
  state = {
    clickee,
    score: 0,
    topScore: 0
  };

  componentDidMount() {
    this.setState({ clickee: this.shuffle(this.state.clickee) });
  }

  handleFirstClick = newClickee => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      clickee: this.shuffle(newClickee),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleSecondClick = clickee => {
    this.setState({
      clickee: this.restart(clickee),
      score: 0
    });
  };

  restart = clickee => {
    const restart = clickee.map(item => ({ ...item, clicked: false }));
    return this.shuffle(restart);
  };

  shuffle = clickee => {
    let i = clickee.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = clickee[i];
      clickee[i] = clickee[j];
      clickee[j] = temp;
      i--;
    }
    return clickee;
  };

  handleItemClick = id => {
    let guessedCorrectly = false;
    const newClickee = this.state.clickee.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    guessedCorrectly
      ? this.handleFirstClick(newClickee)
      : this.handleSecondClick(newClickee);
  };

  render() {
    return (
      <div>
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Header />
        <Container>
          {this.state.clickee.map(item => (
            <ClickItem
              key={item.id}
              id={item.id}
              shake={!this.state.score && this.state.topScore}
              handleClick={this.handleItemClick}
              image={item.image}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default ClickyGame;
