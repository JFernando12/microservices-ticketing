import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    const client = axios.create({
      baseURL: 'www.fernandocastrejon.com',
      headers: req.headers,
    });
    return client;
  } else {
    const client = axios.create({
      baseURL: '/',
    });
    return client;
  }
};
