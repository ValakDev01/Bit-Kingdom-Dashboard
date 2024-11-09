import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import SpinnerMini from '../../../components/SpinnerMini/SpinnerMini';
import useSignUp from '../../../hooks/authentication/useSignUp';
import Button from '../Button/Button';
import Form from '../Form/Form';
import FormRowVertical from '../FormRowVertical/FormRowVertical';
import Input from '../Input/Input';
import Select from '../Select/Select';
import './SignUpForm.scss';

type FormFields = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: 'male' | 'female' | '';
  photo?: FileList;
};

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();

  const { mutate, isLoading } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = data => {
    if (data.password !== data.passwordConfirm) {
      toast.error('Passwords are not the same!');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('passwordConfirm', data.passwordConfirm);
    formData.append('gender', data.gender);

    if (data.photo && data.photo.length > 0) {
      formData.append('photo', data.photo[0]);
    }

    mutate(formData);

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label='Name'>
        <Input
          type='text'
          id='name'
          placeholder='Your Name'
          disabled={isLoading}
          {...register('name', {
            required: { value: true, message: 'Name is required!' },
          })}
        />
        {errors.name && <div className='alert-text'>{errors.name.message}</div>}
      </FormRowVertical>

      <FormRowVertical label='Email address'>
        <Input
          type='email'
          id='email'
          autoComplete='username'
          placeholder='example@gmail.com'
          disabled={isLoading}
          {...register('email', {
            required: { value: true, message: 'Email is required!' },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address!',
            },
          })}
        />
        {errors.email && (
          <div className='alert-text'>{errors.email.message}</div>
        )}
      </FormRowVertical>

      <FormRowVertical label='Password'>
        <div className='input-with-icon'>
          <Input
            type={showPassword ? 'text' : 'password'}
            id='password'
            autoComplete='new-password'
            placeholder='••••••••'
            disabled={isLoading}
            {...register('password', {
              required: { value: true, message: 'Password is required!' },
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters!',
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  // eslint-disable-next-line max-len
                  'Password must include at least 1 uppercase letter, 1 digit, and 1 special character!',
              },
            })}
          />
          <button
            type='button'
            className='icon-button'
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {errors.password && (
          <div className='alert-text'>{errors.password.message}</div>
        )}
      </FormRowVertical>

      <FormRowVertical label='Confirm Password'>
        <div className='input-with-icon'>
          <Input
            type={showPasswordConfirm ? 'text' : 'password'}
            id='passwordConfirm'
            autoComplete='new-password'
            placeholder='••••••••'
            disabled={isLoading}
            {...register('passwordConfirm', {
              required: {
                value: true,
                message: 'Confirm password is required!',
              },
              minLength: {
                value: 8,
                message: 'Confirm Password must have at least 8 characters!',
              },
            })}
          />
          <button
            type='button'
            className='icon-button'
            onClick={() => setShowPasswordConfirm(prev => !prev)}
            aria-label={showPasswordConfirm ? 'Hide password' : 'Show password'}
          >
            {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.passwordConfirm && (
          <div className='alert-text'>{errors.passwordConfirm.message}</div>
        )}
      </FormRowVertical>

      <div className='form-row-inline'>
        <FormRowVertical label='Gender'>
          <Select
            id='gender'
            disabled={isLoading}
            {...register('gender', {
              required: { value: true, message: 'Gender is required!' },
            })}
          >
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Select>
          {errors.gender && (
            <div className='alert-text'>{errors.gender.message}</div>
          )}
        </FormRowVertical>

        <FormRowVertical label='Photo'>
          <Input
            type='file'
            id='photo'
            disabled={isLoading}
            {...register('photo')}
          />
        </FormRowVertical>
      </div>

      <FormRowVertical>
        <Button size='large'>{!isLoading ? 'Sign Up' : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignUpForm;
