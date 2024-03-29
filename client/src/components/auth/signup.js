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
  componentWillUnmount() {
    this.props.authError(null);
  }

  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password })
      .then(() => this.props.history.push('/feature'));
  }

  renderFields() {
    const renderInput = type => ({ input, meta }) => <div>
        <input {...input} className='form-control' type={type} />
        {meta.touched &&
         meta.error &&
         <div className="error">{meta.error}</div>}
      </div>;

    return fields.map(field => (
      <fieldset className='form-group' key={field.name}>
        <label>{field.label}:</label>
        <Field
          name={field.name}
          component={renderInput(field.type)} />
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

const validate = formProps => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match!';
  }

  return errors;
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error
});

export default reduxForm({ form: 'signup', validate })(
  connect(mapStateToProps, actions)(
    withRouter(Signup)));
