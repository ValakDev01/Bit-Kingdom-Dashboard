import Modal from '../../../components/Modal/Modal';
import SpinnerMini from '../../../components/SpinnerMini/SpinnerMini';
import useForgotPassword from '../../../hooks/authentication/useForgotPassword';
import useLogin from '../../../hooks/authentication/useLogin';
import Button from '../Button/Button';
import Form from '../Form/Form';
import FormRowVertical from '../FormRowVertical/FormRowVertical';
import Input from '../Input/Input';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import './LoginForm.scss';

type FormFields = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isLoading } = useLogin();
  const [showModal, setShowModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const resetShowModal = () => setShowModal(false);

  const { isLoading: isSending, mutate: sendEmail } =
    useForgotPassword(resetShowModal);

  const onSubmit: SubmitHandler<FormFields> = data => {
    mutate(data);
    reset();
  };

  const handleClickModal = () => {
    setShowModal(modal => !modal);
    setForgotPasswordEmail('');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <FormRowVertical
        label='Password'
        forgotLabel='Forgot password?'
        onModal={handleClickModal}
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='••••••••'
          disabled={isLoading}
          {...register('password', {
            required: { value: true, message: 'Password is required!' },
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters!',
            },
          })}
        />
        {errors.password && (
          <div className='alert-text'>{errors.password.message}</div>
        )}
        {showModal && (
          <Modal onModal={handleClickModal}>
            <div className='modal__content__data'>
              <h2>Forgot your password?</h2>
              <p>
                Enter your email below, you will receive an email with
                instructions on how to reset your password in a few minutes. You
                can also set a new password if you’ve never set one before.
              </p>
            </div>
            <div className='modal__content__input'>
              <FormRowVertical label='Enter your e-mail address'>
                <Input
                  type='email'
                  id='email'
                  autoComplete='username'
                  placeholder='Enter your e-mail address'
                  disabled={isLoading}
                  value={forgotPasswordEmail}
                  onChange={e => setForgotPasswordEmail(e.target.value)}
                />
              </FormRowVertical>
            </div>
            <div className='modal__content__button'>
              <button
                className='send-button'
                data-disabled={!forgotPasswordEmail.trim() ? 'true' : 'false'}
                onClick={() => sendEmail({ email: forgotPasswordEmail })}
              >
                {isSending ? <SpinnerMini /> : 'Send Instructions'}
              </button>
            </div>
          </Modal>
        )}
      </FormRowVertical>

      <FormRowVertical>
        <Button size='large'>{!isLoading ? 'Log In' : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
