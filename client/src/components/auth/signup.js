import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password })
      .then(() => this.props.history.push('/feature'));
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
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
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <Field
            name="passwordConfirm"
            type="password"
            component="input"
            className='form-control' />
        </fieldset>
        {this.renderError()}
        <button action='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error
});

export default reduxForm({ form: 'signup' })(
  connect(mapStateToProps, actions)(
    withRouter(Signup)));