import Button from '../../authentication/Button/Button';
import Form from '../../authentication/Form/Form';
import Input from '../../authentication/Input/Input';
import FormRow from '../../settings/FormRow/FormRow';

function UpdatePasswordForm() {
  function handleSubmit() {
    return true;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Current password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='Your current password'
        />
      </FormRow>
      <FormRow label='New password (min 8 chars)'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          placeholder='Your new password'
        />
      </FormRow>

      <FormRow label='Confirm password'>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          placeholder='Confirm new password'
        />
      </FormRow>
      <FormRow>
        <Button type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
