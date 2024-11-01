import SpinnerMini from '../../../components/SpinnerMini/SpinnerMini';
import useLogin from '../../../hooks/authentication/useLogin';
import Button from '../Button/Button';
import Form from '../Form/Form';
import FormRowVertical from '../FormRowVertical/FormRowVertical';
import Input from '../Input/Input';
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

  const onSubmit: SubmitHandler<FormFields> = data => {
    mutate(data);
    reset();
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

      <FormRowVertical label='Password'>
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
      </FormRowVertical>

      <FormRowVertical>
        <Button size='large'>{!isLoading ? 'Log In' : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
