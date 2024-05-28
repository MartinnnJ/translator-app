import axios from 'axios';
import { v4 } from 'uuid';

export default async function getSupportedLanguages() {
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
    return await axios.get('https://api.cognitive.microsofttranslator.com/languages', config);
  } catch (err) {
    console.log(err);
  }
}