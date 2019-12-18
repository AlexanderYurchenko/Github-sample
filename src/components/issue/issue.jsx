import React from "react";
import { Link } from "react-router-dom";
import "./issue.scss"

const Issue = ( props ) => {
  const time = '5 hours ago';
  const { title, number, user: {html_url: userHtmlUrl, login: userLogin}, comments, labels } = props.issue;
  const iconClass = props.issue.state === 'open' ? 'c-icon c-icon--exclamation' : 'c-icon c-icon--closed';
  
  return ( 
    <div className="c-issue">
      <div className="c-issue__icon-col">
        <div className={iconClass}></div>
      </div>
      <div className="c-issue__main-col">
        <Link to={`/issue/${number}`} className="c-issue__title">{title}</Link>
        <span className="c-issue__labels">
          {labels.map(label => (
            <a key={label.id} className="c-issue__label" 
              href={label.url} 
              style={{backgroundColor: label.color ? '#' + label.color : ''}} >{label.name}</a>
          ))}
        </span>
        <div className="c-issue__info">
          {'#' + number + ' opened ' + time + ' by '}
          <a className="c-issue__author" href={userHtmlUrl}>{userLogin}</a>
        </div>
      </div>
      <div className="c-issue__aux-col">
        { comments > 0 &&
          <Link to={`/issue/${number}`} className="c-issue__comment-link">{comments}</Link>
        }
      </div>
    </div>
  );
}
 
export default Issue;