import Button from '../../authentication/Button/Button';
import Form from '../../authentication/Form/Form';
import Input from '../../authentication/Input/Input';
import FormRow from '../../settings/FormRow/FormRow';

function DeleteUserAccount() {
  function handleSubmit() {
    return true;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Your password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='Your password'
        />
      </FormRow>

      <FormRow label='Confirm password'>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          placeholder='Confirm your password'
        />
      </FormRow>
      <FormRow label='Confirmation phrase'>
        <Input
          type='text'
          id='fullName'
          placeholder='Type "DELETE MY ACCOUNT" to confirm'
        />
      </FormRow>
      <FormRow>
        <Button type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button variation='danger'>Delete account</Button>
      </FormRow>
    </Form>
  );
}

export default DeleteUserAccount;
