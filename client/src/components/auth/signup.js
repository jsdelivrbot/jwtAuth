import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const fields = [
  {
    name: 'email',
    type: 'email',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  },
  {
    name: 'passwordConfirm',
    type: 'password',
    label: 'Confirm Password'
  }
];

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password })
      .then(() => this.props.history.push('/feature'));
  }

  renderFields() {
    return fields.map(field => (
      <fieldset className='form-group' key={field.name}>
        <label>{field.label}:</label>
        <Field
          name={field.name}
          type={field.type}
          component="input"
          className='form-control' />
      </fieldset>
    ));
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
        {this.renderFields()}
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
