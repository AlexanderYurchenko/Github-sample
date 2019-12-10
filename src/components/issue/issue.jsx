import React from "react";
import "./issue.scss"

const Issue = ( props ) => {
  let time = '5 hours ago',
  iconClass = props.issue.state === 'open' ? 'c-icon c-icon--exclamation' : 'c-icon c-icon--closed'

  return ( 
    <div className="c-issue">
      <div className="c-issue__icon-col">
        <div className={iconClass}></div>
      </div>
      <div className="c-issue__main-col">
        <a href={props.issue.html_url} className="c-issue__title">{props.issue.title}</a>
        <span className="c-issue__labels">
          {props.issue.labels.map(label => (
            <a key={label.id} className="c-issue__label" 
              href={label.url} 
              style={{backgroundColor: label.color ? '#' + label.color : ''}} >{label.name}</a>
          ))}
        </span>
        <div className="c-issue__info">
          {'#' + props.issue.number + ' opened ' + time + ' by '}
          <a className="c-issue__author" href={props.issue.user.html_url}>{props.issue.user.login}</a>
        </div>
      </div>
      <div className="c-issue__aux-col">
        { props.issue.comments > 0 &&
          <a href={props.issue.html_url} className="c-issue__comment-link">{props.issue.comments}</a>
        }
      </div>
    </div>
  );
}
 
export default Issue;