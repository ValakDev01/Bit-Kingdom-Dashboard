import SignUpForm from '../../features/authentication/SignUpForm/SignUpForm';

import './SignUp.scss';

function SignUp() {
  return (
    <main className='signup-layout'>
      <h1 className='heading h4'>Create your free account</h1>
      <SignUpForm />
    </main>
  );
}

export default SignUp;
