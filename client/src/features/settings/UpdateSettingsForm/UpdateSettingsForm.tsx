import useUser from '../../../hooks/authentication/useUser';
import useUpdateSetting from '../../../hooks/settings/useUpdateSetting';
import Form from '../Form/Form';
import FormRow from '../FormRow/FormRow';
import Select from '../Select/Select';

import './UpdateSettingsForm.scss';

function UpdateSettingsForm() {
  const { data } = useUser();

  const { mutate, isLoading } = useUpdateSetting();

  const resultsPerPage = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 50, label: 50 },
  ];

  const currencyDisplayFormat = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
  ];

  const defaultAppTheme = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
  ];

  const resultsPerPageValue = data?.data?.settings?.resultsPerPage || 10;
  const currencyDisplayFormatValue = data?.data?.settings?.currency || 'USD';
  const defaultAppThemeValue = data?.data?.settings?.theme || 'Light Mode';

  const handleChangeSetting =
    (field: string) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      const updatedSettings: {
        resultsPerPage?: number;
        theme?: string;
        currency?: string;
      } = {};

      if (field === 'resultsPerPage') {
        updatedSettings.resultsPerPage = Number(value);
      } else if (field === 'currency') {
        updatedSettings.currency = value;
      } else if (field === 'theme') {
        updatedSettings.theme = value;
      }

      mutate(updatedSettings);
    };

  return (
    <Form type='standard'>
      <FormRow label='Results Per Page'>
        <Select
          id='resultsPerPage'
          defaultValue={resultsPerPageValue}
          options={resultsPerPage}
          disabled={isLoading}
          onChange={handleChangeSetting('resultsPerPage')}
        />
      </FormRow>

      <FormRow label='Currency Display Format'>
        <Select
          id='currencyDisplayFormat'
          defaultValue={currencyDisplayFormatValue}
          options={currencyDisplayFormat}
          disabled={isLoading}
          onChange={handleChangeSetting('currency')}
        />
      </FormRow>

      <FormRow label='Default App Theme'>
        <Select
          id='defaultAppTheme'
          defaultValue={defaultAppThemeValue}
          options={defaultAppTheme}
          disabled={isLoading}
          onChange={handleChangeSetting('theme')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
