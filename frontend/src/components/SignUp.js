import { useForm } from 'react-hook-form';
import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AppContext from '../context/app-context';
import { signUp } from '../context/actions/auth';

const SignUp = () => {
  const { dispatch, auth } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const onSubmit = (user) => {
    dispatch(signUp(user));
    reset();
  };

  return auth.isAuthenticated ? (
    <Redirect to='/' />
  ) : (
    <div>
      <fieldset>
        <legend>Sign Up</legend>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
          <div className='formInput'>
            <div className='formWrapper'>
              <label htmlFor='username'>Username</label>
              <input
                id='username'
                aria-describedby='Enter a username'
                placeholder='Enter a username'
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
            </div>
            {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
          </div>

          <div className='formInput'>
            <div className='formWrapper'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                aria-describedby='Enter a password'
                placeholder='Enter a password'
                {...register('password', {
                  required: 'Please enter a password',
                  minLength: {
                    value: 8,
                    message: 'Minimum 8 characters are allowed',
                  },
                  maxLength: {
                    value: 255,
                    message: 'Maximum 255 characters are allowed',
                  },
                })}
              />
            </div>
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </div>

          <div className='formInput'>
            <div className='formWrapper'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                aria-describedby='Enter email address'
                type='text'
                placeholder='Enter email address'
                {...register('email', {
                  required: 'Please enter your email address',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Enter a valid email address',
                  },
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
            </div>
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </div>

          <button type='submit'>Sign Up</button>
          <button>
            <Link to='/login'>Login</Link>
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default SignUp;
