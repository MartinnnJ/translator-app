import axios from 'axios';
import { v4 } from 'uuid';

export default async function getSupportedLanguages() {
  const API_URL = import.meta.env.VITE_API_URL;

  const config = {
    headers: {
      'X-ClientTraceId': v4(),
      'Accept-Language': 'en',
    },
    params: {
      'api-version': '3.0',
      'scope': 'translation',
    },
  };

  try {
    return await axios.get(`${API_URL}/languages`, config);
  } catch (err) {
    console.log(err);
  }
}