import axios, { AxiosError } from 'axios';
import { v4 } from 'uuid';

export default async function translate(srcText: string, targetLangCode: string) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const LOCATION_NAME = import.meta.env.VITE_LOCATION_NAME;

  const data = [{ 'text': srcText }];
  
  const config = {
    headers: {
      'Content-type': 'application/json',
      'X-ClientTraceId': v4(),
      'Ocp-Apim-Subscription-Key': API_KEY,
      'Ocp-Apim-Subscription-Region': LOCATION_NAME,
    },
    params: {
      'api-version': '3.0',
      'to': targetLangCode,
    },
  };

  try {
    return await axios.post('https://api.cognitive.microsofttranslator.com/translate', data, config);
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response;
    }
  }
}