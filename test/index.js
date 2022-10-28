process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');

const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall6TldKaU9HTTNNamRoWmpreVpXRXhaalkzTjJRMk1TSXNJbVZ0WVdsc0lqb2labVZ5Ym1GdVpHOUFaMjFoYVd3dVkyOXRJaXdpYVdGMElqb3hOalkyT1RVMU5EWXpmUS5pLWVDdlpiX3JKQmxKQ2gwTkVCcE8xaElNYWFFUUJuUnAtRWdsU05HSENzIn0=';
const doRequest = async () => {
  const { data } = await axios.post(
    'https://ticketing.dev/api/tickets',
    {
      title: 'ticket',
      price: 5,
    },
    { headers: { cookie } }
  );

  await axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    {
      title: 'ticket',
      price: 10,
    },
    { headers: { cookie } }
  );

  axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    {
      title: 'ticket',
      price: 15,
    },
    { headers: { cookie } }
  );
};

(async () => {
  for (let i = 0; i < 500; i++) {
    doRequest();
  }
})();
