import React, { Component } from "react";
import { QUESTIONS } from "./questions";
import QuestionView from "./Components/QuestionsView"

class App extends Component {
  state = {
    score: null,
    answers: {},
    savedScore: []
  };

  style = {
    btn: {
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: 700
    },
    calculateBtn: {
      minWidth: "50%"
    },
    calculateWrapper: {
      width: "100%",
      textAlign: "center"
    }
  }

  componentDidMount() {
    this.initializeQuestionAnswers();
    this.setState({
      savedScore: JSON.parse(localStorage.getItem("savedScore") !== null ? localStorage.getItem("savedScore") : "[]")
    })
  }

  initializeQuestionAnswers = () => {
    const initialAnswers = {};
    Object.keys(QUESTIONS).forEach(key => {
      initialAnswers[parseInt(key)] = null;
    });
    this.setState({ answers: initialAnswers });
  };

  handleClick = (que, ans) => {
    const newAnswer = this.state.answers;
    newAnswer[que] = ans;
    this.setState({
      answers: newAnswer
    })
  }

  handleCalculate = () => {
    const answers = Object.values(this.state.answers)
    const totalYes = answers.reduce((acc, curr) => curr ? acc + 1 : acc, 0)
    const currentScore = 100*(totalYes/answers.length) 
    this.setState({ score: currentScore })
    const updatedScores = [...this.state.savedScore, currentScore];
    localStorage.setItem("savedScore", JSON.stringify(updatedScores));
    this.setState({
      savedScore : updatedScores
    })
  }

  checkForNull() {
    return Object.values(this.state.answers).some(value => value === null)
  }

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <QuestionView handleClick={this.handleClick} answers={this.state.answers} />
          {
            (this.state.score == null) ?
              <div style={this.style.calculateWrapper}>
                <button disabled={this.checkForNull()} onClick={this.handleCalculate} style={{ ...this.style.calculateBtn, ...this.style.btn }}>Calculate</button>
              </div>
              :
              <div>
                <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Current Score : {this.state.score}%</h1>
              </div>
          }
          {
            this.state.savedScore.length>0 &&
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Average Score : {(this.state.savedScore.reduce((acc, curr) => acc+curr, 0)/this.state.savedScore.length).toFixed(2)}%</h1>
          }
        </main>
      </div>
    );
  }
}

export default App;
