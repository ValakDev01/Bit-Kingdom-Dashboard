import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/users/login',
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          'Invalid email or password. Please, try again!'
      );
    } else {
      throw new Error('Invalid email or password. Please, try again!');
    }
  }
};

export const signup = async (formData: FormData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/users/signup',
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
    if (axios.isAxiosError(error)) {
      throw new Error('You failed to sign up. Please, try again!');
    } else {
      throw new Error('There was an error while signing up: ' + error);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/v1/users/myAccount',
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        return null;
      }
    }
    throw new Error(
      'There was an error while fetching the current user data: ' + error
    );
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/v1/users/logout',
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error('There was an error while logging out: ' + error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/users/forgotPassword',
      { email },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error('There was an error while sending email: ' + error);
  }
};

export const resetPassword = async (
  password: string,
  passwordConfirm: string,
  token: string
) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/users/resetPassword/${token}`,
      { password, passwordConfirm },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error('There was an error while sending email: ' + error);
  }
};
