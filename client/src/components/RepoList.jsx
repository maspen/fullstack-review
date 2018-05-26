import React from 'react';
import RepoListItem from './RepoListItem.jsx';

class RepoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      isLoaded: false,
      repos: [],
      error: '',
      isMounted: false
    }
  }

  componentDidMount() {
		this.setState({isMounted: true})
  }

  componentWillUnmount() {
  	this.setState({isMounted: false})
  }

/*

		  				return <RepoListItem repo={repo} />

		  				Array.prototype.forEach.call(this.props.repos, repo => {
*/		  				  

  render() {
  	if (this.state.isMounted) {
  		return (
			  <div>
			    <h4> Repo List Component </h4>
			    There are {this.props.repos.length} repos.
			  	<div>{
		  			Array.prototype.map.call(this.props.repos, repo => {
		  				return (
		  							<div>
											<div key={repo.id} />
											<span>owner: {repo.ownerLogin}</span>
											<span>repo: {repo.name}</span>
											<span>description: {repo.description}</span>
											<span>owner URL: {repo.ownerUrl}</span>
											<span>created at: {repo.createdAt}</span>
										</div>)
		  			})
		  		}
		  		</div>
		  		<div>
		  			<span>After repo list</span>
		  		</div>
			  </div>
  		)
  	} else {
  		return (
			  <div>
			    <h4> Repo List Component </h4>
			    Repo list is loading ... 
			  </div>
  		)
  	}
  }
}

/*

{
		  			this.props.repos.map(function(repo){
		  				return (
		  					<RepoListItem repo={repo} />
		  				)
		  			})
		  		}

*/

/*
	    <div class="repos">
	  		{
	  			props.repos.map(function(repo){
	  				return (
	  					<RepoListItem repo={repo} />
	  				)
	  			})
	  		}
	  	</div>
*/

// const RepoList = (props) => {

//   return (
// 	  <div>
// 	  	{ console.log('repose', props.repos) }
// 	    <h4> Repo List Component </h4>
// 	    There are {props.repos.length} repos.
// 	  </div>
//   )
// }

export default RepoList;