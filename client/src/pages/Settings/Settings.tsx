// eslint-disable-next-line max-len
import UpdateSettingsForm from '../../features/settings/UpdateSettingsForm/UpdateSettingsForm';

import './Settings.scss';

function Settings() {
  return (
    <div className='row vertical'>
      <h1 className='heading'>Update your settings</h1>
      <UpdateSettingsForm />
    </div>
  );
}

export default Settings;
