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
      issuesPerPage: 30,
      currentPage: null,
    }
  }

  // makeHttpRequestWithPage = async pageNumber => {
  //   let response = await fetch(`https://api.github.com/repos/facebook/create-react-app/issues?state=all&per_page=${this.state.issuesPerPage}&page=${pageNumber}`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const data = await response.json();
  //   console.log(data);

  //   this.setState({
  //     issues: data,
  //     totalIssues: data[0].number
  //   });
  // }

  makeHttpRequestWithPage = pageNumber => {
    let url = `https://api.github.com/repos/facebook/create-react-app/issues?state=all&per_page=${this.state.issuesPerPage}&page=${pageNumber}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          issues: data,
          totalIssues: data[0].number
        });
      })
      .catch(error => console.error(error))
      .then(this.refreshIssuesList)
  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
    // let url = "https://api.github.com/repos/facebook/create-react-app/issues?state=all&page=1"
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({issues: data});
    //   })
    //   .catch(error => console.error(error))
    //   .then(this.refreshIssuesList)
  }

  refreshIssuesList = () => this.setState({refreshIssuesList: !this.state.refreshIssuesList})

  handlePaginationClick = (event) => {
    console.log(event);
    this.makeHttpRequestWithPage(1);
  }

  render() { 
    const { issues, refreshIssuesList, totalIssues, currentPage, issuesPerPage } = this.state;

    return (
      <React.Fragment>
        <div className="w-inner">
          <div className="c-header"></div>
          <div className="w-center">
            <main className="container">
              <Switch>
                <Route exact path="/" children={(props) => (
                  props.match
                    ? <IssuesList 
                        {...props} 
                        issues={issues} 
                        refresh={refreshIssuesList}
                        totalIssues={totalIssues}
                        currentPage={currentPage}
                        issuesPerPage={issuesPerPage}
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
