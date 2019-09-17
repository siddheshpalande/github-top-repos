import React from 'react';

class ListContainer extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div style={{margin:'25px auto', display: 'table'}}>
        <p>{this.props.data.isFetching ? 'Fetching repos...' : ''}</p>
        <ul style={{listStyle:'none'}}>{this.props.data.repos}</ul>
      </div>
    );
  }
}

export default ListContainer;