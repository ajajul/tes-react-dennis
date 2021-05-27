import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./pages/sign-in";
import JobsList from "./pages/jobs";
import Header from "./components/header";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/jobs" component={JobsList} />
          <Route path="/">
            <SignIn />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
