import React, { Component } from "react";
import "./issue-single.scss"

class IssueSingle extends Component {
  state = { 
    issue: null
  }

  componentDidMount() {
    // const postRegExp = new RegExp("([^\/]+$)")
    const issueId = this.props.match.params.issueId;
    console.log(issueId);
    let url = "https://api.github.com/repos/facebook/create-react-app/issues/" + issueId + ".json"
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({issue: data});
      })
  }

  render() { 
    console.log(this.state.issue);
    const { issue } = this.state;
    const commentsText = issue && issue.comments > 1 ? 'comments' : 'comment';

    return (
      issue ? 
      <div className="c-issue-single">
        <div className="c-issue-single_title">IE11 support doesn't work in dev mode, even after adding all polyfills and enabling ie11 support
          <div className="c-issue-single_title-num">#8197</div>
        </div>
        <div className="c-issue-single_sub-box">
          <div className={"c-issue-single_state " + ( issue.state ? "c-issue-single_state--" + issue.state : '')}>
            <div className="c-issue-single_icon c-icon"></div>{issue.state && issue.state}
          </div>
          <div className="c-issue-single_sub-table">
            <a href="#" className="c-issue-single_author">Taranov</a> opened this issue
            <div className="c-issue-single_time-rel">{ issue.created_at }</div>
            { issue.comments && <div className="c-issue-single_sub-coments">{issue.comments} {commentsText}</div> }
          </div>
        </div>
        <div className="c-issue-single_content">
          <div className="c-issue-single_main">
            <div className="c-issue-single_comments-box">
              <div className="c-issue-single_comment">
                <div className="c-issue-single_comment-inner">
                  <div className="c-issue-single_avatar-box">
                    <a className="c-issue-single_avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="40" height="40"/>
                    </a>
                  </div>
                  <div className="c-issue-single_comment-header">
                    <a href="#" className="c-issue-single_author">Taranov</a>
                    &nbsp;commented&nbsp;
                    { issue.created_at }
                  </div>
                  <div className="c-issue-single_comment-body">
                    { issue.body }
                    {/* <p>i install react use npx create-react-app and run project , chrome show it but fire fox and IE not showing!!!</p>
                    <p>fire fox Error in Consol: SyntaxError: missing = in const declaration</p>
                    <p>IE error SCRIPT1002: Syntax error</p> */}
                  </div>
                </div>
              </div>

              <div className="c-issue-single_sub-comment">
                <div className="c-issue-single_sub-icon"></div>
                <div className="c-issue-single_sub-body">
                  <div className="c-issue-single_sub-avatar-box">
                    <a className="c-issue-single_sub-avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="20" height="20"/>
                    </a>
                  </div>
                  <a href="#" className="c-issue-single_author">Taranov</a> added
                  <div className="c-issue-single_sub-labels-box">
                    <a href="#" className="c-label" style={{backgroundColor: '#d4c5f9'}}>issue: bug report</a>
                    <a href="#" className="c-label" style={{backgroundColor: '#d4c5f9'}}>needs triage</a>
                  </div>
                  labels
                  <a href="#" className="c-issue-single_action-time">4 days ago</a>
                </div>
              </div>

              <div className="c-issue-single_sub-comment">
                <div className="c-issue-single_sub-icon"></div>
                <div className="c-issue-single_sub-body">
                  <div className="c-issue-single_sub-avatar-box">
                    <a className="c-issue-single_sub-avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="20" height="20"/>
                    </a>
                  </div>
                  <a href="#" className="c-issue-single_author">heyimalex</a> added
                  <div className="c-issue-single_sub-labels-box">
                    <a href="#" className="c-label" style={{backgroundColor: '#d4c5f9'}}>priority: low (ignored issue template)</a>
                  </div>
                  and removed
                  <div className="c-issue-single_sub-labels-box">
                    <a href="#" className="c-label" style={{backgroundColor: '#d4c5f9'}}>issue: bug report</a>
                  </div>
                  labels
                  <a href="#" className="c-issue-single_action-time">4 days ago</a>
                </div>
              </div>

              <div className="c-issue-single_comment">
                <div className="c-issue-single_comment-inner">
                  <div className="c-issue-single_avatar-box">
                    <a className="c-issue-single_avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="40" height="40"/>
                    </a>
                  </div>
                  <div className="c-issue-single_comment-header">
                    <a href="#" className="c-issue-single_author">yquir</a>
                    &nbsp;commented yesterday
                  </div>
                  <div className="c-issue-single_comment-body">
                    <p>mee too</p>
                  </div>
                </div>
              </div>

              <div className="c-issue-single_comment">
                <div className="c-issue-single_comment-inner">
                  <div className="c-issue-single_avatar-box">
                    <a className="c-issue-single_avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="40" height="40"/>
                    </a>
                  </div>
                  <div className="c-issue-single_comment-header">
                    <a href="#" className="c-issue-single_author">wnz27</a>
                    &nbsp;commented yesterday
                  </div>
                  <div className="c-issue-single_comment-body">
                    <blockquote>
                      <p>me too
                        <br/>
                        <a data-hovercard-type="user" data-hovercard-url="/users/yqyily/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/yqyily">@yqyily</a>
                      </p>
                    </blockquote>
                    <p>I solve it, your <code>creat-react-app</code> is not latest version<br/>
                    do this by step:</p>
                    <ol>
                      <li>run this command <code>npm install -g create-react-app</code></li>
                      <li>then run <code>npx create-react-app yourprojectname</code><br/>
                      you can build a complete project structure</li>
                    </ol>
                  </div>
                </div>
              </div>

              { issue.closed_by ? 
              <div className="c-issue-single_sub-comment">
                <div className="c-issue-single_sub-icon"></div>
                <div className="c-issue-single_sub-body">
                  <div className="c-issue-single_sub-avatar-box">
                    <a className="c-issue-single_sub-avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="20" height="20"/>
                    </a>
                  </div>
                  <a href="#" className="c-issue-single_author">{ issue.closed_by.login }</a> closed this
                  <a href="#" className="c-issue-single_action-time">{ issue.closed_at }</a>
                </div>
              </div> : ''}

            </div>
            <div className="c-issue-single_form-box">
              <div className="c-issue-single_comment">
                <div className="c-issue-single_comment-inner">
                  <div className="c-issue-single_avatar-box">
                    <a className="c-issue-single_avatar">
                      <img alt="@riazi" src="https://avatars0.githubusercontent.com/u/15103168?s=88&amp;v=4" width="40" height="40"/>
                    </a>
                  </div>
                  <div className="c-issue-single_comment-header">
                    tabs
                  </div>
                  <div className="c-issue-single_comment-body">
                    tabs in
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="c-issue-single_side">
          
          </div>
        </div>
        
      </div> : ''
    );
  }
}
 
export default IssueSingle;