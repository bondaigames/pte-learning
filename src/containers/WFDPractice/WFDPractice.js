import React, { Component } from "react";
import Player from "../../components/Player/Player";
import axiosServer from "../../axios/pte-server/axios-pte-server";
import axiosFirebase from "../../axios/pte-firebase/axios-pte-firebase";
import _ from "lodash";

class WFDPractice extends Component {
  state = {
    data: [],
    questions: {},
    questId: 1,
    answerInput: "",
    showAnswer: false,
    error: ""
  };

  componentDidMount() {
    //https://ptelearning-7266d.firebaseio.com/wfd.json
    this.loadQuestionBank();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      // if (!_.isEmpty()){}
    }
  }

  loadQuestionBank = () => {
    axiosFirebase
      .get('/wfd.json?orderBy="$key"&limitToLast=1')
      .then(response => {
        return Object.keys(response.data).map(question => {
          console.log("question", response.data[question]);
          const questionObj = response.data[question];
          this.setState({ questions: questionObj });
          console.log("ques bank: ", this.state);
          console.log("check empty: ", !_.isEmpty(this.state.questions));
          if (!_.isEmpty(this.state.questions)) {
            // const currentQuestion = this.state.questions[
            //   this.state.questions.length - 1
            // ][0];

            //check last item except createDate field
            // Object.keys(this.state.questions).find((item, i) =>
            //   console.log("item:", item, i)
            // );

            // const currentQuestion = Object.keys(questionObj)[
            //   Object.keys(questionObj).length - 2
            // ];

            // const questId = Object.keys(questionObj).length - 2;

            // this.setState({
            //   questId: 0
            // });

            const questKey = Object.keys(questionObj)[this.state.questId];

            if (this.state.questions[questKey].length > 0) {
              this.loadData("cmt.mp3", this.state.questions[questKey][0]);
            }
          }
        });
      })
      .catch(error => {
        console.log("error inserting qb: ", error);
        // this.setState({ error : error});
      });
  };

  loadData = (fileName, text) => {
    const params = {
      fileName: fileName,
      text: text
    };
    axiosServer
      .post("/wfd", params)
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log("error load data : ", error);
      });
  };

  handleShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  answerChangeHandler = e => {
    this.setState({ answerInput: e.target.value });
  };

  keyPressed = event => {
    if (event.key === "Enter") {
      console.log(this.state);

      this.submitQuestionHandler();
    }
  };

  submitQuestionHandler = () => {
    const questKeys = Object.keys(this.state.questions);
    const questKey = questKeys[this.state.questId];

    if (this.state.questions[questKey].length <= 0) return;

    if (this.state.questions[questKey][0] === this.state.answerInput) {
      this.setState({ answerInput: "", error: "" });
      this.nextQuestion();
    } else {
      this.setState({ error: "Please listen carefully." });
    }
  };

  nextQuestionHandler = () => {
    this.nextQuestion();
  };

  prevQuestionHandler = () => {
    this.setState({ answerInput: "", error: "" });
    this.previousQuestion();
  };

  nextQuestion = () => {
    this.setState({ error: "" });
    const questKeys = Object.keys(this.state.questions);

    if (this.state.questId >= questKeys.length - 3) {
      this.setState({ error: "No more questions." });
      return;
    }

    const nextQuestId = this.state.questId + 1;
    this.setState({
      questId: nextQuestId
    });

    const questKey = questKeys[nextQuestId];

    if (this.state.questions[questKey].length > 0) {
      this.loadData("cmt.mp3", this.state.questions[questKey][0]);
    }
  };

  previousQuestion = () => {
    if (this.state.questId === 0) {
      this.setState({ error: "No previous question." });
      return;
    }

    const prevQuestId = this.state.questId - 1;
    this.setState({
      questId: prevQuestId
    });

    const questKey = Object.keys(this.state.questions)[prevQuestId];

    if (this.state.questions[questKey].length > 0) {
      this.loadData("cmt.mp3", this.state.questions[questKey][0]);
    }
  };

  render() {
    let currentAnswer = "";

    if (!_.isNil(this.state.questions) && !_.isEmpty(this.state.questions)) {
      const questKey = Object.keys(this.state.questions)[this.state.questId];
      currentAnswer = this.state.questions[questKey][0];
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1>Write From Dictation</h1>
          </div>
        </div>
        <div className="text-left">
          {this.state.error ? (
            <div className="alert alert-danger" role="alert">
              {this.state.error}
            </div>
          ) : (
            ""
          )}
          <button
            className="btn btn-secondary mr-3"
            type="button"
            onClick={this.handleShowAnswer}
          >
            Show Answer
          </button>
          {this.state.showAnswer ? (
            <div className="alert alert-success" role="alert">
              <span>{currentAnswer}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="col">
            <Player source={this.state.data}></Player>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                className="border rounded form-control"
                placeholder="Please enter your answer here"
                onKeyPress={this.keyPressed}
                onChange={this.answerChangeHandler}
                value={this.state.answerInput}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group d-block">
              <button
                className="btn btn-secondary mr-1"
                type="button"
                onClick={this.prevQuestionHandler}
              >
                Previous
              </button>
              <button
                className="btn btn-secondary mr-1"
                type="button"
                onClick={this.nextQuestionHandler}
              >
                Next
              </button>
              <button
                className="btn btn-secondary mr-1 float-left"
                type="button"
                onClick={this.submitQuestionHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default WFDPractice;
