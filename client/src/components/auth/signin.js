import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password })
      .then(() => this.props.history.push('/feature'));
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <Field
            name="email"
            type="email"
            component="input"
            className='form-control' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <Field
            name="password"
            type="password"
            component="input"
            className='form-control' />
        </fieldset>
        <button action='submit' className='btn btn-primary'>Sign in</button>
      </form>
    );
  }
}

export default reduxForm({ form: 'signin' })(
  connect(null, actions)(
    withRouter(Signin)));
