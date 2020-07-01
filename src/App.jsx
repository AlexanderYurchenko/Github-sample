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
      totalIssues: null,
      issuesPerPage: 30,
      currentPage: 1,
    }
  }

  makeHttpRequestWithPage = (pageNumber, init) => {
    let url = `https://api.github.com/repos/facebook/create-react-app/issues?state=all&per_page=${this.state.issuesPerPage}&page=${pageNumber}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          issues: data,
          currentPage: pageNumber
        });

        if (init) {
          this.setState({
            totalIssues: data[0].number
          });
        }
      })
      .catch(error => console.error(error))
  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1, 'init');
  }

  handlePaginationClick = (number) => {
    this.makeHttpRequestWithPage(number);
  }

  render() {
    const { issues, totalIssues, currentPage, issuesPerPage } = this.state;

    return (
      <React.Fragment>
        <div className="w-inner">
          <div className="c-header">Header</div>
          <div className="w-center">
            <main className="container">
              <Switch>
                <Route exact path="/" children={(props) => (
                  props.match
                    ? <IssuesList
                        {...props}
                        issues={issues}
                        totalIssues={totalIssues}
                        currentPage={currentPage}
                        issuesPerPage={issuesPerPage}
                        onIssueClick={this.handleIssueClick}
                        onPaginationClick={this.handlePaginationClick}/> : ''
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
