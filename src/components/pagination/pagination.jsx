import React, { Component } from 'react';
import "./pagination.scss"

class Pagination extends Component {
  state = { 
    totalIssues: null,
    currentPage: 1,
    issuesPerPage: null,
    pageNumbers: 0,
  }

  componentDidMount() {
    const pageNumbers = Math.ceil(this.props.totalIssues / this.props.issuesPerPage);
    this.setState({ 
      totalIssues: this.props.totalIssues,
      currentPage: this.props.currentPage,
      issuesPerPage: this.props.issuesPerPage,
      pageNumbers
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps !== prevState){
      const pageNumbers = Math.ceil(nextProps.totalIssues / nextProps.issuesPerPage);
      return { 
        issues: nextProps.issues,
        totalIssues: nextProps.totalIssues,
        currentPage: nextProps.currentPage,
        issuesPerPage: nextProps.issuesPerPage,
        pageNumbers
      };
    } else {
      return null;
    }
  }

  render() { 
    const pagesArray = [],
    { currentPage, pageNumbers } = this.state;

    for (let i = 1; i <= pageNumbers; i++) {
      pagesArray.push(i);
    }

    const renderPageNumbers = pagesArray.map(number => {
      if (number === currentPage - 3 && number > 1) {
        return (
          <span key={number.toString()} className="c-pagination_link c-pagination_gap">…</span> 
        );
      } else if (number === currentPage) {
        return (
          <em key={number.toString()} className="c-pagination_link c-pagination_current">{number}</em> 
        );
      } else if (number === 1 || number === pageNumbers || (number >= currentPage - 2 && number <= currentPage + 2)) {
        return (
          <span key={number.toString()} className="c-pagination_link" onClick={() => this.props.onPaginationClick(number)}>{number}</span>
        );
      } else if (number === currentPage + 3 && number < pageNumbers) {
        return (
          <span key={number.toString()} className="c-pagination_link c-pagination_gap">…</span> 
        );
      } 
      return false;
    });

    return ( 
      <div className="c-pagination">
        <div className="c-pagination_inner">
          <span className={"c-pagination_link c-pagination_prev " + (currentPage === 1 ? 'disabled' : '')}
            onClick={() => this.props.onPaginationClick(currentPage - 1)}>Previous</span> 
          {renderPageNumbers}
          <span className={"c-pagination_link c-pagination_next " + (currentPage === pageNumbers ? 'disabled' : '')}
            onClick={() => this.props.onPaginationClick(currentPage + 1)}>Next</span>
        </div>
      </div>
    );
  }
}
 
export default Pagination;