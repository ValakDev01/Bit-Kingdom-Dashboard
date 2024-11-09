/* eslint-disable max-len */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import FullPageSpinner from '../../components/FullPageSpinner/FullPageSpinner';
import SpinnerMini from '../../components/SpinnerMini/SpinnerMini';
import Button from '../../features/authentication/Button/Button';
import Form from '../../features/authentication/Form/Form';
import FormRowVertical from '../../features/authentication/FormRowVertical/FormRowVertical';
import Input from '../../features/authentication/Input/Input';
import useResetPassword from '../../hooks/authentication/useResetPassword';
import './ResetPassword.scss';

type FormFields = {
  email: string;
  confirmEmail: string;
};

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      confirmEmail: '',
    },
  });

  const { mutate, isLoading } = useResetPassword();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { token } = useParams();

  const onSubmit: SubmitHandler<FormFields> = () => {
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords are not the same!');
      return;
    }

    mutate({
      password: newPassword,
      passwordConfirm: confirmNewPassword,
      token,
    });
    reset();
  };

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className='reset-layout'>
      <h1 className='heading h4'>Change your password</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical label='Enter new password'>
          <Input
            type='password'
            id='email'
            autoComplete='username'
            placeholder='Enter your new password...'
            disabled={isLoading}
            {...register('email', {
              required: { value: true, message: 'New password is required!' },
            })}
            onChange={e => setNewPassword(e.target.value)}
          />
          {errors.email && (
            <div className='alert-text'>{errors.email.message}</div>
          )}
        </FormRowVertical>

        <FormRowVertical label='Confirm new password'>
          <Input
            type='password'
            id='password'
            autoComplete='current-password'
            placeholder='Repeat your new password...'
            disabled={isLoading}
            {...register('confirmEmail', {
              required: {
                value: true,
                message: 'Confirm password is required!',
              },
            })}
            onChange={e => setConfirmNewPassword(e.target.value)}
          />
          {errors.confirmEmail && (
            <div className='alert-text'>{errors.confirmEmail.message}</div>
          )}
        </FormRowVertical>

        <FormRowVertical>
          <Button size='large'>
            {!isLoading ? 'Save new password' : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
    </main>
  );
}

export default ResetPassword;
