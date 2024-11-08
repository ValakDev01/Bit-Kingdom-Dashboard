import axios, { AxiosError } from 'axios';

export const updateMyData = async (formData: FormData) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/users/updateMyAccount`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error updating your data: ${error}`);
  }
};

export const updateMyPassword = async (
  passwordCurrent: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/users/updateMyPassword`,
      { passwordCurrent, password, passwordConfirm },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const deleteMyAccount = async (
  password: string,
  passwordConfirm: string,
  phrase: string
) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/users/deleteMyAccount`,
      {
        data: { password, passwordConfirm, phrase },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
