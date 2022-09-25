export const fetchFromApi = async (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-KEY': process.env.API_KEY,
    },
  });
};
