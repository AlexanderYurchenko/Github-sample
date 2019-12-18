import React, { Component } from "react";
import "./issue-single.scss"

class IssueSingle extends Component {
  state = { 
    issue: {}
  }

  componentDidMount() {
    // const postRegExp = new RegExp("([^\/]+$)")
    // const postId = postRegExp.exec(this.props.match.url)
    // let url = "https://raw.githubusercontent.com/AlexanderYurchenko/ReactTask/master/src/data/post" + postId[1] + ".json"
    // fetch(url)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({post: data.post});
    //   })
    this.setState({
      issue: this.props
    })
  }

  render() { 
    console.log(this.props);

    return (
      <div className="c-issue-single">
        <div className="c-issue-single_title">IE11 support doesn't work in dev mode, even after adding all polyfills and enabling ie11 support
          <div className="c-issue-single_title-num">#8197</div>
        </div>
        <div className="c-issue-single_sub-box">
          <div className="c-issue-single_state">
            <div className="c-issue-single_icon c-icon"></div>Open
          </div>
          <div className="c-issue-single_sub-table">
            <div className="c-issue-single_author">Taranov</div>
            <div className="c-issue-single_opened-text">opened this issue</div>
            <div className="c-issue-single_time-rel">1 hour ago</div>
            <div className="c-issue-single_sub-coments">2 coments</div>
          </div>
        </div>
        <div className="c-issue-single_content">
          <div className="c-issue-single_main">
            <div className="c-issue-single_comments-box">
              <div className="c-issue-single_comment">

              </div>
              <div className="c-issue-single_sub-comments-box">
                <div className="c-issue-single_sub-comment">
                  
                </div>

              </div>
            </div>
            <div className="c-issue-single_form-box">

            </div>
          </div>
          <div className="c-issue-single_side">
          
          </div>
        </div>
        
      </div>
    );
  }
}
 
export default IssueSingle;