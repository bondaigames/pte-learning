import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import QuestionBuilder from "./containers/QuestionBuilder/QuestionBuilder";
import WFDPractice from "./containers/WFDPractice/WFDPractice";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import PTEBuilder from "./containers/PTEBuilder/PTEBuilder";
import StudyServices from "./components/Layout/StudyServices/StudyServices";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/services" component={StudyServices} />
        <Route path="/addQuestionBank" component={QuestionBuilder} />
        <Route path="/wfd-practice" component={WFDPractice} />
        <Route path="/" exact component={PTEBuilder} />
      </Switch>
    </Layout>
  );
}

export default App;
