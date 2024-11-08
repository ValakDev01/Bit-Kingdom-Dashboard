/* eslint-disable max-len */
import useUpdateYourPassword from '../../../hooks/account/useUpdateYourPassword';
import Button from '../../authentication/Button/Button';
import Form from '../../authentication/Form/Form';
import Input from '../../authentication/Input/Input';
import FormRow from '../../settings/FormRow/FormRow';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  password: string;
  passwordConfirm: string;
  passwordCurrent: string;
};

function UpdatePasswordForm() {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordCurrent, setPasswordCurrent] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutate } = useUpdateYourPassword();

  const onSubmit: SubmitHandler<FormFields> = data => {
    mutate({
      passwordCurrent: data.passwordCurrent,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Current password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='Your current password'
          {...register('passwordCurrent', {
            required: { value: true, message: 'Password is required!' },
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters!',
            },
          })}
          onChange={event => setPasswordCurrent(event.target.value)}
        />
        {errors.passwordCurrent && (
          <div className='alert-text'>{errors.passwordCurrent.message}</div>
        )}
      </FormRow>
      <FormRow label='New password (min 8 chars)'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='Your new password'
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
                'Password must include at least 1 uppercase letter, 1 digit, and 1 special character!',
            },
          })}
          onChange={event => setPassword(event.target.value)}
        />

        {errors.password && (
          <div className='alert-text'>{errors.password.message}</div>
        )}
      </FormRow>

      <FormRow label='Confirm password'>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          placeholder='Confirm new password'
          {...register('passwordConfirm', {
            required: { value: true, message: 'Password is required!' },
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters!',
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                'Password must include at least 1 uppercase letter, 1 digit, and 1 special character!',
            },
          })}
          onChange={event => setPasswordConfirm(event.target.value)}
        />
        {errors.passwordConfirm && (
          <div className='alert-text'>{errors.passwordConfirm.message}</div>
        )}
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          onClick={() => {
            setPassword('');
            setPasswordConfirm('');
            setPasswordCurrent('');
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={
            password || passwordConfirm || passwordCurrent ? false : true
          }
        >
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
