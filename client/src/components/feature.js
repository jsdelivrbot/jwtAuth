import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: '' };
  }

  componentWillMount() {
    this.props.fetchMessage()
      .then(res => this.setState({ msg: res.data.message }));
  }

  render() {
    return (
      <div>
        <h5>Super Cool Feature</h5>
        <strong>Message: </strong>{this.state.msg}
      </div>
    );
  }
}

export default connect(null, actions)(Feature);
