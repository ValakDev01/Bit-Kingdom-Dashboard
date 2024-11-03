/* eslint-disable max-len */
import DeleteUserAccount from '../../features/account/DeleteUserAccount/DeleteUserAccount';
import UpdatePasswordForm from '../../features/account/UpdatePasswordForm/UpdatePasswordForm';
import UpdateUserDataForm from '../../features/account/UpdateUserDataForm/UpdateUserDataForm';

import './Account.scss';

function Account() {
  return (
    <>
      <h1 className='heading space'>Update your account</h1>

      <div className='row vertical'>
        <h1 className='heading h3'>Update your data</h1>
        <UpdateUserDataForm />
      </div>

      <div className='row vertical'>
        <h1 className='heading h3'>Update your password</h1>
        <UpdatePasswordForm />
      </div>

      <div className='row vertical'>
        <h1 className='heading h3'>Delete your account</h1>
        <DeleteUserAccount />
      </div>
    </>
  );
}

export default Account;
