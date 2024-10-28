import axios from 'axios';

export const getAllCryptos = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/crypto');
    return response.data.data;
  } catch (error) {
    throw new Error(`Error fetching cryptocurrencies: ${error}`);
  }
};
