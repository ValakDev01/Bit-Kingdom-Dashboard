import axios from 'axios';

export const getAllCryptos = async (
  sort?: string,
  filterParams?: object,
  page?: number,
  limit?: number
) => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/crypto', {
      params: {
        sort,
        page,
        limit,
        ...filterParams,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching cryptocurrencies: ${error}`);
  }
};

export const getTotalCryptoCount = async (
  sort?: string,
  filterParams?: object
) => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/crypto', {
      params: { sort, ...filterParams },
    });
    return response.data.totalCount;
  } catch (error) {
    throw new Error(`Error fetching total cryptocurrency count: ${error}`);
  }
};

export const getSingleCryptoData = async (currency: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/crypto/${currency}`
    );

    return response.data;
  } catch (error) {
    throw new Error(`Error fetching ${currency} data: ${error}`);
  }
};
