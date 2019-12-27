import React, { Component } from "react";
import Service from "./Service/Service";

class StudyServices extends Component {
  render() {
    return (
      <section>
        <div className="form-group">
          <h1 className="text-center">Study Services</h1>
        </div>
        <Service
          link="/wfd-practice"
          subtitle="For this item type you hear a short sentence. Type the sentence into the response box on the screen."
        >
          Write From Dictation
        </Service>
      </section>
    );
  }
}
export default StudyServices;
