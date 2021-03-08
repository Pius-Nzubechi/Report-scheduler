import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import ReportForm from "./ReportForm";
import Image from "./components/Image"
import Report from "./components/Pages/Report";


class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route
          exact
          path="/"
          render={(props) => (
            <React.Fragment>
              <ReportForm />
              <Image />
            </React.Fragment>
          )}
        />
        <Route path="/report" component={Report} />
      </Router>
    );
  }
}

export default App;
