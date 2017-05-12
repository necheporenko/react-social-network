import React, { PropTypes } from 'react';
import { Input } from 'formsy-react-components';

const FormSignIn = ({
                      email_value,
                      password_value
                   }) => {
  return (
    <div>
      <Input
        name="email"
        value={email_value}
        type="email"
        validations="isEmail"
        placeholder="Your Email"
        elementWrapperClassName={[{'col-sm-9': false}]}
        labelClassName={[{'col-sm-3': false}, 'disabled-label']}
        required
      />
      <Input
        name="password"
        value={password_value}
        type="password"
        placeholder="Your Password"
        validations="minLength:2"
        validationErrors={{
          minLength: 'The entered password less than 8 characters'
        }}
        elementWrapperClassName={[{'col-sm-9': false}]}
        labelClassName={[{'col-sm-3': false}, 'disabled-label']}
        required
      />
    </div>
  );
};

FormSignIn.propTypes = {
  email_value: PropTypes.string,
  password_value: PropTypes.string
};

export default FormSignIn;
