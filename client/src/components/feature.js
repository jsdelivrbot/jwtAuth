import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  componentWillMount() {
    this.props.fetchMessage()
      .then(({ data: { message }}) => this.setState({ message }));
  }

  render() {
    return (
      <div>{this.state.message}</div>
    );
  }
}

export default connect(null, actions)(Feature);
