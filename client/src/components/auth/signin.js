import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input {...email} className='form-control' />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input {...password} className='form-control' />
        </fieldset>
        <button action='submit' className='btn btn-primary'>Sign in</button>
      </form>
    );
  }
}

const SigninContainer = connect(null, actions)(Signin);

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(SigninContainer);
