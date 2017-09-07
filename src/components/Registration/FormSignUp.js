import React, {PropTypes} from 'react';
import {Input} from 'formsy-react-components';

const FormSignUp = ({
                      firstName_value,
                      lastName_value,
                      email_value,
                      password_value
                    }) => {
  return (
    <div>
      <Input
        name="firstName"
        value={firstName_value}
        type="text"
        validations="isWords"
        validationErrors={{
          isWords: 'Use only letters',
          // minLength: 'The entered name less than 3 letters'
        }}
        placeholder="First Name"
        elementWrapperClassName={[{'col-sm-9': false}]}
        labelClassName={[{'col-sm-3': false}, 'disabled-label']}
        required
      />
      <Input
        name="lastName"
        value={lastName_value}
        type="text"
        validations="isWords"
        validationErrors={{
          isWords: 'Use only letters',
          // minLength: 'The entered name less than 3 letters'
        }}
        placeholder="Last Name"
        elementWrapperClassName={[{'col-sm-9': false}]}
        labelClassName={[{'col-sm-3': false}, 'disabled-label']}
        required
      />
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
        validations="minLength:8"
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

FormSignUp.propTypes = {
  firstName_value: PropTypes.string,
  lastName_value: PropTypes.string,
  email_value: PropTypes.string,
  password_value: PropTypes.string
};

export default FormSignUp;
