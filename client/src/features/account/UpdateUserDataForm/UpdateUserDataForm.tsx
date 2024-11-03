import Button from '../../authentication/Button/Button';
import Form from '../../authentication/Form/Form';
import Input from '../../authentication/Input/Input';
import FormRow from '../../settings/FormRow/FormRow';

import './UpdateUserDataForm.scss';

function UpdateUserDataForm() {
  function handleSubmit() {
    return true;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input placeholder={'sample@gmail.com'} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input type='text' id='fullName' placeholder='Your Name' />
      </FormRow>
      <FormRow label='Avatar image'>
        <input
          type='file'
          className='file-input'
          id='avatar'
          accept='image/*'
        />
      </FormRow>
      <FormRow>
        <Button type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
