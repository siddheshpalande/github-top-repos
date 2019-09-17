import React from 'react';

class RepoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    };
  }

  render() {
    const divStyle = {
  margin: '20px',
  border: '1px solid',
  display: 'flex',
  width: '500px',
  alignItems: 'center'
};
const inStyle = {
  fontSize: '15px',
  padding: '20px'
};
    
    return (
      <div style={divStyle}>
       <img src={this.state.details.avatar} style={{padding: '10px',  borderRadius: '50%'}} alt={this.state.details.name} height="100" width="100" />
       <div style={inStyle}>
       <div>Repo Name : {this.state.details.name}</div>
      <div>Owner : {this.state.details.owner}</div>
      <div>Fork count : {this.state.details.forks}</div>
      <div>Star count : {this.state.details.stars}</div>
      </div>
      </div>
    );
  }
}

export default RepoContainer;