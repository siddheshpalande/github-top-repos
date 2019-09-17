import React from 'react';
import ListContainer from './ListContainer';
import SearchComponent from './SearchComponent';
import axios from 'axios';
import RepoContainer from './RepoContainer';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      isFetching: false
    }
  }

  componentDidMount() {
      this.fetchRepos();
  }

  fetchReposWithAxios = () => {
    this.setState({ ...this.state, isFetching: true });
    axios.get('https://api.github.com/search/repositories?q=forks:>=1000&sort=forks&order=desc')
      .then(response => {
        const listItems = response.data.items.map((repo) => {
          const detailsObj = {
            'name': repo.name,
            'owner': repo.owner.login,
            'forks': repo.forks_count,
            'stars': repo.stargazers_count,
            'avatar': repo.owner.avatar_url
          }
          return <li key={repo.id}><RepoContainer details={detailsObj} /></li>
        }
        );
        this.setState({repos: listItems, isFetching: false })
      })
      .catch(e => {
        console.log(e);
        this.setState({ ...this.state, isFetching: false });
      });
  };

  fetchRepos = this.fetchReposWithAxios

  mainCallback = (dataFromChild) => {
    console.log('dataFromChild',dataFromChild);
    this.setState({repos: dataFromChild});
  };

  render() {
  return( 
    <div>
    <SearchComponent callback={this.mainCallback} />
    <p style={{textAlign: 'center'}}>{this.state.repos.length} results found</p>
    <ListContainer data={this.state}/>/>
    </div >
  
  );
}
}

export default MainComponent;
