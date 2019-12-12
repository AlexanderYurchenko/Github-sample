import React, { Component } from 'react';
import "./pagination.scss"

class Pagination extends Component {
  state = { 
    totalIssues: null,
    currentPage: null,
    issuesPerPage: null
  }

  componentDidMount() {
    this.setState({ 
      totalIssues: this.props.totalIssues,
      currentPage: this.props.currentPage,
      issuesPerPage: this.state.issuesPerPage
    })
  }

  renderPageNumbers = pageNumbers.map(number => {
    let classes = this.state.current_page === number ? styles.active : '';
  
    if (number == 1 || number == this.state.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
      return (
        <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
      );
    }
  });


  render() { 
    return ( 
      <div className="c-pagination">
        <div className="c-pagination_inner">
          <span className="c-pagination_link c-pagination_prev disabled">Previous</span> 
          <em className="c-pagination_link c-pagination_current">1</em> 
          <a className="c-pagination_link" rel="next" 
            onClick={() => this.props.onPaginationClick(2)}
            href="#">2</a> 
          <a className="c-pagination_link" href="/facebook/create-react-app/issues?page=3&amp;q=is%3Aissue&amp;utf8=%E2%9C%93">3</a> 
          <a className="c-pagination_link" href="/facebook/create-react-app/issues?page=4&amp;q=is%3Aissue&amp;utf8=%E2%9C%93">4</a> 
          <a className="c-pagination_link" href="#" onClick={(event) => this.props.onPaginationClick(event)}>5</a> 
          <span className="c-pagination_link c-pagination_gap">…</span> 
          <a className="c-pagination_link" href="/facebook/create-react-app/issues?page=208&amp;q=is%3Aissue&amp;utf8=%E2%9C%93">208</a> 
          <a className="c-pagination_link" href="/facebook/create-react-app/issues?page=209&amp;q=is%3Aissue&amp;utf8=%E2%9C%93">209</a> 
          <a className="c-pagination_link c-pagination_next" rel="next" href="/facebook/create-react-app/issues?page=2&amp;q=is%3Aissue&amp;utf8=%E2%9C%93">Next</a>
        </div>
      </div>
    );
  }
}
 
export default Pagination;