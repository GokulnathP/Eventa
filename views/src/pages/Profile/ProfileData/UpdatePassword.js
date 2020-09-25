import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import swal from 'sweetalert';

import classes from '../../Auth/Login/login.module.css';

import axios from 'axios';
import url from '../../../server.js';

const UpdatePassword = () => {
  const initialState = {
    oldpassword: { value: '', error: '' },
    password: { value: '', error: '' },
    cpassword: { value: '', error: '' },
  };

  const [fields, setFields] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedField = {
      ...fields[name],
    };

    updatedField.value = value;

    setFields({
      ...fields,
      [name]: updatedField,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isError = false;
    if (fields.oldpassword.value.length < 8) {
      isError = true;
      fields.oldpassword.error = 'Old Password is invalid';
    } else {
      fields.oldpassword.error = '';
    }

    if (fields.password.value.length < 8) {
      isError = true;
      fields.password.error = 'Invalid password ';
    } else {
      fields.password.error = '';
    }

    if (fields.cpassword.value !== fields.password.value) {
      isError = true;
      fields.cpassword.error = 'Passwords do not match ';
    } else {
      fields.cpassword.error = '';
    }

    setFields({
      ...fields,
    });

    if (!isError) {
      setLoading(true);
      const userData = {
        oldPassword: fields.oldpassword.value,
        newPassword: fields.password.value,
      };
      let config = {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      };
      let passwordUrl = url + 'user/changePassword';

      axios
        .put(passwordUrl, userData, config)
        .then((res) => {
          setLoading(false);

          swal('Password reset', 'Your password reset succesfully', 'success')
            .then((res) => {
              if (res) {
                setIsSubmit(true);
              }
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          setLoading(false);
          swal('Error', 'Check your password again', 'error');
        });
    }
  };

  return (
    <div className={classes['bg-login']}>
      {isSubmit && <Redirect to='/profile' />}
      <div className={classes['forget']}>
        <form className={classes['form-login']} onSubmit={handleSubmit}>
          <h5>Create New Password</h5>
          <span className={classes['inputs-login']}>
            <div>
              <div className={classes['form_group']}>
                <label htmlFor='oldpassword'>Current Password</label>
                <input
                  className={classes['form_input']}
                  type='password'
                  name='oldpassword'
                  id='oldpassword'
                  minLength='8'
                  value={fields.oldpassword.value}
                  placeholder='Enter Current Password'
                  onChange={handleChange}
                  required
                />
                <h6>{fields.oldpassword.error}</h6>
              </div>
              <div className={classes['form_group']}>
                <label htmlFor='password'>New Password</label>
                <input
                  className={classes['form_input']}
                  type='password'
                  name='password'
                  id='password'
                  minLength='8'
                  value={fields.password.value}
                  placeholder='Enter your Password'
                  onChange={handleChange}
                  required
                />
                <h6>{fields.password.error}</h6>
              </div>
              <div className={classes['form_group']}>
                <label htmlFor='cpassword'>Confirm Password</label>
                <input
                  className={classes['form_input']}
                  type='password'
                  name='cpassword'
                  id='cpassword'
                  minLength='8'
                  value={fields.cpassword.value}
                  placeholder='Re-enter your Password'
                  onChange={handleChange}
                  required
                />
                <h6>{fields.cpassword.error}</h6>
              </div>
              {loading ? (
                <button
                  type='button'
                  className={[
                    'btn btn-primary btn-block',
                    classes.next,
                    classes.link,
                    classes['btn-primary'],
                  ].join(' ')}
                  disable='true'
                >
                  Loading
                </button>
              ) : (
                <button
                  type='submit'
                  className={[
                    'btn btn-primary btn-block',
                    classes.next,
                    classes.link,
                    classes['btn-primary'],
                  ].join(' ')}
                >
                  Submit
                </button>
              )}
              <Link to='/profile'>
                <button
                  type='submit'
                  className={[
                    'btn btn-primary btn-block',
                    classes.next,
                    classes.link,
                    classes['btn-primary'],
                  ].join(' ')}
                >
                  Cancel
                </button>
              </Link>
            </div>
          </span>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
