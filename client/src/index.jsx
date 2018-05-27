import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListItem from './components/RepoListItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      repos: [],
      error: ''
    }
    this.fetchFromGithug = this.fetchFromGithug.bind(this);
    this.search = this.search.bind(this);
    this.postGithubUser = this.postGithubUser.bind(this);
  }

  /* You should populate data with AJAX calls in the 
  componentDidMount lifecycle method. This is so you can 
  use setState to update your component when the data is 
  retrieved. */
  componentDidMount() {
    this.fetchFromGithug();
  }

  fetchFromGithug() {
    fetch("/repos")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log('client index, fetch, records', res);

        this.setState({
          isLoaded: true,
          repos: res
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error
        });
      }
    ).then(() => {
      console.log('client/index/render componentDidMount', this.state);
    })
    .catch((error) => {
      console.log('got error fetching github list:', error);
    });
  }

  search (username) {
    if (username !== null && username.length > 1) {
      console.log(`index received ${username} from searched input field`);
      this.postGithubUser(username);
    } else {
      console.log('username cannot be null nor shorter in length than 1');
    }
  }

  postGithubUser(username) {
    var userName = username;
    fetch('/repos', {
      method: 'POST',
      body: JSON.stringify({githubuser: userName}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('github username submitted, respomse: ', response);
    })
    .catch((error) => {
      console.log('received error when submitting username: ', error);
    });
  }

  render () {
    const { error, isLoaded, repos } = this.state;
    if(error) {
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={0}/>
          <Search onSearch={this.search} callFetch={this.fetchFromGithug} />
        </div>
      )
    } else if (!isLoaded) {
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={0}/>
          <div>loading Github data ...</div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos}/>
          <Search onSearch={this.search} callFetch={this.fetchFromGithug} />
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));