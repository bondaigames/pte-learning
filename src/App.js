import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ExcelReader from "./components/ExcelReader/ExcelReader";
import Testing from "./testing";
import QuestionBuilder from "./containers/QuestionBuilder/QuestionBuilder";

function App() {
  return (
    <div className="container">
      <QuestionBuilder></QuestionBuilder>
      {/* <ExcelReader></ExcelReader> */}
    </div>
  );
}

export default App;
