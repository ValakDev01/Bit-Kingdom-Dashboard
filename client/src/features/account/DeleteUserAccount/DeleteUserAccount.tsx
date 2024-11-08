import useDeleteYourAccount from '../../../hooks/account/useDeleteYourAccount';
import Button from '../../authentication/Button/Button';
import Form from '../../authentication/Form/Form';
import Input from '../../authentication/Input/Input';
import FormRow from '../../settings/FormRow/FormRow';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  password: string;
  passwordConfirm: string;
  phrase: string;
};

function DeleteUserAccount() {
  const [password, setPassword] = useState<string>('');
  const [phrase, setPhrase] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutate } = useDeleteYourAccount();

  const onSubmit: SubmitHandler<FormFields> = data => {
    mutate({
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      phrase: data.phrase,
    });

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Your password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='Your password'
          {...register('password', {
            required: { value: true, message: 'Password is required!' },
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters!',
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
          placeholder='Confirm your password'
          {...register('passwordConfirm', {
            required: { value: true, message: 'Password is required!' },
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters!',
            },
          })}
          onChange={event => setPasswordConfirm(event.target.value)}
        />
        {errors.passwordConfirm && (
          <div className='alert-text'>{errors.passwordConfirm.message}</div>
        )}
      </FormRow>
      <FormRow label='Confirmation phrase'>
        <Input
          type='text'
          id='fullName'
          placeholder='Type "DELETE MY ACCOUNT" to confirm'
          {...register('phrase', {
            required: { value: true, message: 'Phrase is required!' },
          })}
          onChange={event => setPhrase(event.target.value)}
        />
        {errors.phrase && (
          <div className='alert-text'>{errors.phrase.message}</div>
        )}
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          onClick={() => {
            setPassword('');
            setPasswordConfirm('');
          }}
        >
          Cancel
        </Button>
        <Button
          variation='danger'
          disabled={password || passwordConfirm || phrase ? false : true}
        >
          Delete account
        </Button>
      </FormRow>
    </Form>
  );
}

export default DeleteUserAccount;
