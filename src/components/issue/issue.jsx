import React from "react";
import { Link } from "react-router-dom";
import "./issue.scss"

const Issue = ( props ) => {
  const time = '5 hours ago';
  const { title, number, user: {html_url: userHtmlUrl, login: userLogin}, comments, labels } = props.issue;
  const iconClass = props.issue.state === 'open' ? 'c-icon c-icon--exclamation' : 'c-icon c-icon--closed';
  
  return ( 
    <div className="c-issue">
      <div className="c-issue_icon-col">
        <div className={iconClass}></div>
      </div>
      <div className="c-issue_main-col">
        <Link to={`/issue/${number}`} className="c-issue_title">{title}</Link>
        <span className="c-issue_labels">
          {labels.map(label => (
            <a key={label.id} className="c-label" 
              href={label.url} 
              style={{backgroundColor: label.color ? '#' + label.color : ''}} >{label.name}</a>
          ))}
        </span>
        <div className="c-issue_info">
          {'#' + number + ' opened ' + time + ' by '}
          <a className="c-issue_author" href={userHtmlUrl}>{userLogin}</a>
        </div>
      </div>
      <div className="c-issue_aux-col">
        { comments > 0 &&
          <Link to={`/issue/${number}`} className="c-issue_comment-link">{comments}</Link>
        }
      </div>
    </div>
  );
}
 
export default Issue;