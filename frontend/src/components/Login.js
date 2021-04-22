import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../context/app-actions';
import AppContext from '../context/app-context';
import { Redirect } from 'react-router';

const Login = () => {
  const { dispatch, isAuthenticated } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const onSubmit = (user) => {
    dispatch(login(user));
    reset();
  };

  return isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            placeholder='Username'
            {...register('username', {
              required: 'Please enter a username',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters are allowed',
              },
              maxLength: {
                value: 255,
                message: 'Maximum 255 characters are allowed',
              },
            })}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            placeholder='Password'
            {...register('password', {
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters are allowed',
              },
              maxLength: {
                value: 255,
                message: 'Maximum 255 characters are allowed',
              },
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <input type='submit' value='Login' />
      </form>
    </div>
  );
};

export default Login;
