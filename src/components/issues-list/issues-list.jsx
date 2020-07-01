import React, { Component } from "react";
import Issue from "../issue/issue";
import Pagination from "../pagination/pagination";
import "./issues-list.scss"

class IssuesList extends Component {
  state = {
    issues: [],
    totalIssues: null,
    currentPage: null,
    issuesPerPage: null
  }

  componentDidMount() {
    this.setState({
      issues: this.props.issues ,
      totalIssues: this.props.totalIssues,
      currentPage: this.props.currentPage,
      issuesPerPage: this.props.issuesPerPage,
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps !== prevState){
      return {
        issues: nextProps.issues,
        totalIssues: nextProps.totalIssues,
        currentPage: nextProps.currentPage,
        issuesPerPage: nextProps.issuesPerPage
      };
    } else {
      return null;
    }
  }

  render() {
    const { issues, totalIssues, currentPage, issuesPerPage } = this.state;

    return (
      <div className="c-issues-list">
        <div className="c-issues-list_inner">
          {issues.map(issue => (
            <Issue key={issue.id} issue={issue}/>
          ))}
        </div>
        <div className="c-issues-list_pag-box">
          { totalIssues > issuesPerPage &&
            <Pagination
              totalIssues={totalIssues}
              currentPage={currentPage}
              issuesPerPage={issuesPerPage}
              onPaginationClick={this.props.onPaginationClick}
            />
          }
        </div>
      </div>
    );
  }
}

export default IssuesList;