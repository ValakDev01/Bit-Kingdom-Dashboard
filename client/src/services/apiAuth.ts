import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/users/login',
      {
        email,
        password,
      }
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

// export const signup = async (
//   name: string,
//   email: string,
//   password: string,
//   passwordConfirm: string,
//   gender: string,
//   photo?: FileList | undefined
// ) => {
//   try {
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('passwordConfirm', passwordConfirm);
//     formData.append('gender', gender);

//     if (photo && photo.length > 0) {
//       formData.append('photo', photo);
//     }

//     const response = await axios.post(
//       'http://localhost:5000/api/v1/users/signup',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error('You failed to sign up. Please, try again!');
//     } else {
//       throw new Error('There was an error while signing up: ' + error);
//     }
//   }
// };
