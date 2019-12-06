import React, { Component } from "react";
import Issue from "../issue/issue";
import "./issues-list.scss"

class IssuesList extends Component {
  state = { 
    issues: []
  }

  render() { 
    return (
      <div className="c-issues-list">
        {this.state.issues.map(issue => (
          <Issue key={issue.id} issue={issue}/>
        ))}
      </div>
    );
  }
}
 
export default IssuesList;