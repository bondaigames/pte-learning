import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import QuestionBuilder from "./containers/QuestionBuilder/QuestionBuilder";
import WFDPractice from "./containers/WFDPractice/WFDPractice";

function App() {
  return (
    <div className="container text-center">
      <QuestionBuilder></QuestionBuilder>
      <WFDPractice></WFDPractice>
    </div>
  );
}

export default App;
