import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './common.scss';
import './App.scss';
import IssuesList from "./components/issues-list/issues-list";
import IssueSingle from "./components/issue-single/issue-single";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      issues: [],
      refreshIssuesList: false
    }
  }

  componentDidMount() {
    // let url = "https://api.github.com/facebook/create-react-app/issues"
    let url = "https://api.github.com/repos/facebook/create-react-app/issues"
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({issues: data});
        console.log(data);
      })
      .catch(error => console.error(error))
      .then(this.refreshIssuesList)
  }

  refreshIssuesList = () => this.setState({refreshIssuesList: !this.state.refreshIssuesList})

  render() { 
    const { issues, refreshIssuesList } = this.state;

    return (
      <React.Fragment>
        <div className="w-inner">
          <div className="c-header"></div>
          <div className="w-center">
            <main className="container">
            <Switch>
              <Route exact path="/" children={(props) => (
                props.match
                  ? <IssuesList {...props} issues={issues} refresh={refreshIssuesList}/> : ''
              )}/>
              <Route path="/issue/:issueId" children={(props) => (
                props.match
                  ? <IssueSingle {...props}/> : ''
              )}/>

            </Switch>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
 
export default App;
