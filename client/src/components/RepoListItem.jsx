import React from 'react';

/*
createdAt
:
"2014-03-28T17:55:38Z"
description
:
"This repo is for demonstration purposes only."
id
:
18221276
name
:
"git-consortium"
ownerLogin
:
"octocat"
ownerUrl
:
"https://api.github.com/users/octocat"
*/
const RepoListItem = (props) => {

	return (
		<div>
			<div key={this.props.repo.id} />
			<span>owner: {this.props.repo.ownerLogin}</span>
			<span>repo: {this.props.repo.name}</span>
			<span>description: {this.props.repo.description}</span>
			<span>owner URL: {this.props.repo.ownerUrl}</span>
			<span>created at: {this.props.repo.createdAt}</span>
		</div>
	)
}

export default RepoListItem;