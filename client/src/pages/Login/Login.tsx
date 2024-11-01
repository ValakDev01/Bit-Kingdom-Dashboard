import LoginForm from '../../features/authentication/LoginForm/LoginForm';

import './Login.scss';

function Login() {
  return (
    <main className='login-layout'>
      <h1 className='heading h4'>Log in to your account</h1>
      <LoginForm />
    </main>
  );
}

export default Login;
