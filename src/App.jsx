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
      refreshIssuesList: false,
      totalIssues: null,
      issuesPerPage: null,
      currentPage: null
    }
  }

  // makeHttpRequestWithPage = async pageNumber => {
  //   let response = await fetch(`https://api.github.com/repos/facebook/create-react-app/issues?state=all&page=${pageNumber}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const data = await response.json();

  //   this.setState({
  //     issues: data.data,
  //     totalIssues: data.total,
  //     issuesPerPage: data.per_page,
  //     currentPage: data.page,
  //   });
  // }

  componentDidMount() {
    // this.makeHttpRequestWithPage(1);
    let url = "https://api.github.com/repos/facebook/create-react-app/issues?state=all&page=2"
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({issues: data});
      })
      .catch(error => console.error(error))
      .then(this.refreshIssuesList)
  }

  refreshIssuesList = () => this.setState({refreshIssuesList: !this.state.refreshIssuesList})

  render() { 
    const { issues, refreshIssuesList } = this.state;
    console.log(this.state.issues);

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
        <div className="w-footer">Footer</div>
      </React.Fragment>
    );
  }
}
 
export default App;
