import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }

    this.callFetch = this.callFetch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(event) {
    event.preventDefault();
    this.props.onSearch(this.state.term);
  }

  callFetch() {
    this.props.fetch();
  }
 
  render() {
    return (
      <div>
        <h4>Add more repos!</h4>
          Enter a github username: <input value={this.state.terms} onChange={this.onChange} />       
        <button onClick={this.search}> Add Repos </button>
      </div>
    ) 
  }
}

export default Search;