import React, { Component } from "react";
import Issue from "../issue/issue";
import "./issues-list.scss"

class IssuesList extends Component {
  state = { 
    issues: [],
    refresh: false
  }

  // componentWillReceiveProps(props) {
  //   const { refresh } = this.props;
  //   if (props.refresh !== refresh) {
  //     this.setState({ posts: props.posts })
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.refresh !== prevState.refresh){
      return { issues: nextProps.issues };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.setState({ issues: this.props.issues })
  }

  render() { 
    // console.log(this.props.issues.length)
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