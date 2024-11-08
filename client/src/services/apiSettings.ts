import axios, { AxiosError } from 'axios';

export const updateMySettings = async (
  resultsPerPage?: number,
  theme?: string,
  currency?: string
) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/users/updateMySettings`,
      { resultsPerPage, theme, currency },
      { withCredentials: true }
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
