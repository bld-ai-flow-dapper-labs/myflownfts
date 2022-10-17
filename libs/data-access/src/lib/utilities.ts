export const fetchFromApi = async (url: string) => {
  if (!process.env['API_KEY']) return;
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-KEY': process.env['API_KEY'],
    },
  });
};

export const fetchFromCurrencyApi = async (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      authorization: `Apikey ${process.env['CURRENCY_API_KEY']}`,
    },
  });
};

export const postToApi = async (url: string) => {
  if (!process.env['API_KEY']) return;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-API-KEY': process.env['API_KEY'],
    },
  });
};
