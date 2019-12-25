import React, { Component } from "react";
import Player from "../../components/Player/Player";
import axiosServer from "../../axios/pte-server/axios-pte-server";
import axiosFirebase from "../../axios/pte-firebase/axios-pte-firebase";
import _ from "lodash";

class WFDPractice extends Component {
  state = {
    data: [],
    questions: {},
    showAnswer: false
  };

  componentDidMount() {
    //https://ptelearning-7266d.firebaseio.com/wfd.json
    this.loadQuestionBank();
  }

  loadQuestionBank = () => {
    axiosFirebase
      .get('/wfd.json?orderBy="$key"&limitToLast=1')
      .then(response => {
        console.log(response.data);
        Object.keys(response.data).map(question => {
          console.log("question", response.data[question]);
          const questionObj = response.data[question];
          this.setState({ questions: questionObj });
          if (!_.isEmpty(this.state.questions)) {
            this.loadData("cmt.mp3", this.state.questions[0][0]);
          }
          //   if (this.state.questions.length > 0) {
          //     console.log(this.state.questions[0][0]);
          //     this.loadData(this.state.questions[0][0]);
          //   }

          //   console.log(questionObj);
          //   return Object.keys(questionObj).map((key, i) => {
          //     console.log(questionObj[key]);
          // if (key !== "createdDate") {
          //   console.log(questionObj[key][0]);
          //   const text = questionObj[key][0];
          //   return this.loadData(i + ".mp3", text);
          // }
          // return null;
          //   });
          //   console.log("testing: ", response.data[question]);
        });
        // this.setState({ questions: response.data });
        // console.log("data firebase: ", this.state.data);
      })
      .catch(error => {
        console.log("error inserting");
      });
  };

  loadData = (fileName, text) => {
    console.log("load Data from file");
    const params = {
      fileName: fileName,
      text: text
    };
    axiosServer
      .post("/wfd", params)
      .then(response => {
        console.log("testing: ", response.data);
        this.setState({ data: response.data });
        console.log("after testing: ", this.state.data);
        // const blob = new Blob([response.AudioStream], {
        //   type: response.ContentType
        // });
        // const url = window.URL.createObjectURL(blob);
      })
      .catch(error => {
        console.log("error inserting");
      });
  };

  handleShowAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  render() {
    // this.props.updateData(data, cols);
    // this.setState({
    //   loading: false
    // });
    return (
      <React.Fragment>
        <div className="text-left">
          <button
            className="btn btn-secondary mr-3"
            type="button"
            onClick={this.handleShowAnswer}
          >
            Show Answer
          </button>
          {this.state.showAnswer ? (
            <div className="alert alert-success" role="alert">
              <span>testing</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <Player source={this.state.data}></Player>
      </React.Fragment>
    );
  }
}
export default WFDPractice;
