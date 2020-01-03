import React, { Component } from "react";
import "./issue-single.scss"

class IssueSingle extends Component {
  constructor(props) {
    super(props);
    this.sortActions = this.sortActions.bind(this);
    this.fetchIssue = this.fetchIssue.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.getAllIssueData = this.getAllIssueData.bind(this);
  }

  state = { 
    issue: null,
    comments: null,
    events: null,
    sumActions: null
  }

  componentDidMount() {
    const issueId = this.props.match.params.issueId;
    const issueUrl = "https://api.github.com/repos/facebook/create-react-app/issues/" + issueId + ".json";
    const commentsUrl = "https://api.github.com/repos/facebook/create-react-app/issues/" + issueId + "/comments";
    const eventsUrl = "https://api.github.com/repos/facebook/create-react-app/issues/" + issueId + "/events";
  
    this.getAllIssueData(issueUrl, commentsUrl, eventsUrl).then(([issue, comments, events]) => {
      let sumActions = [ ...comments, ...events ];
      sumActions.sort(this.sortActions);
      this.setState({
        issue,
        comments,
        events,
        sumActions
      });
    })
  }

  fetchIssue(url) {
    return fetch(url)
      .then(response => response.json());
  }

  fetchComments(url) {
    return fetch(url)
      .then(response => response.json());
  }

  fetchEvents(url) {
    return fetch(url)
      .then(response => response.json());
  }

  getAllIssueData(issueUrl, commentsUrl, eventsUrl) {
    return Promise.all([this.fetchIssue(issueUrl), this.fetchComments(commentsUrl), this.fetchEvents(eventsUrl)])
  }

  sortActions(a, b) {
    const date1 = new Date(a.created_at || a.updated_at);
    const date2 = new Date(b.created_at || b.updated_at);
    return date1 - date2;
  }

  render() { 
    const { issue, sumActions } = this.state;
    const commentsText = issue && issue.comments > 1 ? 'comments' : 'comment';

    return (
      issue ? 
      <div className="c-issue-single">
        <div className="c-issue-single_title">IE11 support doesn't work in dev mode, even after adding all polyfills and enabling ie11 support
          <div className="c-issue-single_title-num">{'#' + issue.number}</div>
        </div>
        <div className="c-issue-single_sub-box">
          <div className={"c-issue-single_state " + ( issue.state ? "c-issue-single_state--" + issue.state : '')}>
            <div className="c-issue-single_icon c-icon"></div>{issue.state && issue.state}
          </div>
          <div className="c-issue-single_sub-table">
            <a href={issue.user.html_url} className="c-issue-single_author">Taranov</a> opened this issue
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
                    <a className="c-issue-single_avatar" href={issue.user.html_url}>
                      <img alt={'@' + issue.user.login} src={issue.user.avatar_url} width="40" height="40"/>
                    </a>
                  </div>
                  <div className="c-issue-single_comment-header">
                    <a href={issue.user.html_url} className="c-issue-single_author">Taranov</a>
                    &nbsp;commented&nbsp;
                    { issue.created_at }
                  </div>
                  <div className="c-issue-single_comment-body">
                    { issue.body }
                  </div>
                </div>
              </div>

              { sumActions && sumActions.map(singleAction => {
                if (singleAction.event) {
                  return (
                    <div key={singleAction.id} className="c-issue-single_sub-comment">
                      <div className={'c-issue-single_sub-icon' + (singleAction.event === 'closed' ? ' c-issue-single_sub-icon--close' : '')}></div>
                      <div className="c-issue-single_sub-body">
                        <div className="c-issue-single_sub-avatar-box">
                          <a href={singleAction.actor.html_url} className="c-issue-single_sub-avatar">
                            <img alt={'@' + singleAction.actor.login} src={singleAction.actor.avatar_url} width="20" height="20"/>
                          </a>
                        </div>
                        <a href={singleAction.actor.html_url} className="c-issue-single_author">{singleAction.actor.login}</a> {singleAction.event}
                        {singleAction.label && <div className="c-issue-single_sub-labels-box">
                            <a href="#" 
                            className="c-label" 
                            style={{backgroundColor: singleAction.label.color ? '#' + singleAction.label.color : ''}}>{singleAction.label.name}</a>
                          </div>
                        }
                        <a href="#" className="c-issue-single_action-time">{singleAction.created_at}</a>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div key={singleAction.id} className="c-issue-single_comment">
                      <div className="c-issue-single_comment-inner">
                        <div className="c-issue-single_avatar-box">
                          <a className="c-issue-single_avatar" href={singleAction.user.html_url}>
                            <img alt={'@' + singleAction.user.login} src={singleAction.user.avatar_url} width="40" height="40"/>
                          </a>
                        </div>
                        <div className="c-issue-single_comment-header">
                          <a href={singleAction.user.html_url} className="c-issue-single_author">{singleAction.user.login}</a>
                          &nbsp;{singleAction.updated_at}
                        </div>
                        <div className="c-issue-single_comment-body">
                          {singleAction.body}
                        </div>
                      </div>
                    </div>
                  )
                }
                
              })}
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
                    Comment form
                  </div>
                  <div className="c-issue-single_comment-body">
                    Just a stub
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="c-issue-single_side">
            <div className="c-issue-single_side-item">
              <div className="c-issue-single_side-title">Assignees</div>
              <div className="c-issue-single_side-content">
                {issue.assignee ? issue.assignee.login : 'No one assigned'}
              </div>
            </div>
            <div className="c-issue-single_side-item">
              <div className="c-issue-single_side-title">Labels</div>
              <div className="c-issue-single_side-content">
                {issue.labels.length ? issue.labels.map((label, index) => {
                  return ( 
                    <a href="#" key={index}
                    className="c-label" 
                    style={{backgroundColor: label.color ? '#' + label.color : ''}}>{label.name}</a>
                  )
                }) : 'No labels'}
              </div>
            </div>
            <div className="c-issue-single_side-item">
              <div className="c-issue-single_side-title">Projects</div>
              <div className="c-issue-single_side-content">
                None yet
              </div>
            </div>

            <div className="c-issue-single_side-item">
              <div className="c-issue-single_side-title">Milestone</div>
              <div className="c-issue-single_side-content">
                {issue.milestone ? issue.milestone.title : 'No milestone'}
              </div>
            </div>

            <div className="c-issue-single_side-item">
              <div className="c-issue-single_side-title">{sumActions.length + (sumActions.length > 1 ? ' participants' : ' participant')}</div>
              <div className="c-issue-single_side-content">
                {sumActions ? sumActions.map((singleAction, index) => {
                  return ( 
                    <a href={singleAction && singleAction.actor ? singleAction.actor.html_url : singleAction.user.html_url} 
                    key={index} 
                    className="c-issue-single_side-user">
                      <img alt={singleAction && '@' + (singleAction.actor ? singleAction.actor.login : singleAction.user.login)} 
                        src={singleAction && singleAction.actor ? singleAction.actor.avatar_url : singleAction.user.avatar_url} 
                        width="26" height="26"/>
                    </a>
                  )
                }) : 'No one assigned'}
              </div>
            </div>
          </div>
        </div>
        
      </div> : ''
    );
  }
}
 
export default IssueSingle;