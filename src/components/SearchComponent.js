import React from 'react';
import axios from 'axios';
import RepoContainer from './RepoContainer';


class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtext: '',
      loading: false,
      repos: []
    };
  }

  search = async val => {
    this.setState({ loading: true });
    const res = await axios(
      `https://api.github.com/search/repositories?q=${val}&sort=forks&order=desc`
    );
    const listItems = res.data.items.map((repo) => {
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
    this.setState({ repos: listItems, isFetching: false })
    this.props.callback(listItems?listItems:[]);
  };

  handleChange = event => {
    this.setState({ searchtext: event.target.value });
  };

  buttonClick() {
    this.search(this.state.searchtext);
  }


  render() {
    const divStyle = {
      margin: '25px auto',
      border: '1px solid',
      display: 'flex',
      width: '500px',
      alignItems: 'center'
    };

    return (
      <div style={divStyle}>
        <input
          type="text"
          name="searchtext"
          placeholder="Search Repositories"
          value={this.state.searchtext}
          onChange={this.handleChange}
          style={{width:'inherit'}}
        />
              <button onClick={this.buttonClick.bind(this)}>
                Search
      </button>
      </div>
    );
  }
}

export default SearchComponent;