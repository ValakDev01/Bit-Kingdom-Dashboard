import useUser from '../../../hooks/authentication/useUser';
import Form from '../Form/Form';
import FormRow from '../FormRow/FormRow';
import Select from '../Select/Select';

import './UpdateSettingsForm.scss';

function UpdateSettingsForm() {
  const { data } = useUser();

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
    { value: 'Light Mode', label: 'Light Mode' },
    { value: 'Dark Mode', label: 'Dark Mode' },
  ];

  const resultsPerPageValue = data?.data?.settings?.resultsPerPage || 10;
  const currencyDisplayFormatValue = data?.data?.settings?.currency || 'USD';
  const defaultAppThemeValue = data?.data?.settings?.theme || 'Light Mode';

  return (
    <Form type='standard'>
      <FormRow label='Results Per Page'>
        <Select
          id='resultsPerPage'
          defaultValue={resultsPerPageValue}
          options={resultsPerPage}
        />
      </FormRow>

      <FormRow label='Currency Display Format'>
        <Select
          id='currencyDisplayFormat'
          defaultValue={currencyDisplayFormatValue}
          options={currencyDisplayFormat}
        />
      </FormRow>

      <FormRow label='Default App Theme'>
        <Select
          id='defaultAppTheme'
          defaultValue={defaultAppThemeValue}
          options={defaultAppTheme}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
