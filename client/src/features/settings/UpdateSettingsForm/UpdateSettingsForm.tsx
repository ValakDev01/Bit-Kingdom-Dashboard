import Form from '../Form/Form';
import FormRow from '../FormRow/FormRow';
import Select from '../Select/Select';

import './UpdateSettingsForm.scss';

function UpdateSettingsForm() {
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

  return (
    <Form type='standard'>
      <FormRow label='Results Per Page'>
        <Select id='resultsPerPage' options={resultsPerPage} />
      </FormRow>

      <FormRow label='Currency Display Format'>
        <Select id='currencyDisplayFormat' options={currencyDisplayFormat} />
      </FormRow>

      <FormRow label='Default App Theme'>
        <Select id='defaultAppTheme' options={defaultAppTheme} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
