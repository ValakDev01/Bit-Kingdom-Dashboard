import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import useUpdateYourData from '../../../hooks/account/useUpdateYourData';
import Button from '../../authentication/Button/Button';
import Form from '../../authentication/Form/Form';
import Input from '../../authentication/Input/Input';
import FormRow from '../../settings/FormRow/FormRow';
import './UpdateUserDataForm.scss';

type FormFields = {
  name?: string;
  photo?: FileList;
};

function UpdateUserDataForm() {
  const [name, setName] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const { register, handleSubmit, reset } = useForm<FormFields>();

  const { mutate } = useUpdateYourData();

  const onSubmit: SubmitHandler<FormFields> = data => {
    const formData = new FormData();
    if (data.name) {
      formData.append('name', data.name);
    }

    if (data.photo && data.photo.length > 0) {
      formData.append('photo', data.photo[0]);
    }

    mutate(formData);

    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Email address'>
        <Input placeholder={'sample@gmail.com'} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          id='fullName'
          placeholder='Your Name'
          {...register('name')}
          onChange={event => setName(event.target.value)}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <input
          type='file'
          className='file-input'
          id='avatar'
          accept='image/*'
          {...register('photo')}
          onChange={event => setPhoto(event.target.value)}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          onClick={() => {
            setName('');
            setPhoto('');
          }}
        >
          Cancel
        </Button>
        <Button disabled={name || photo ? false : true}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
