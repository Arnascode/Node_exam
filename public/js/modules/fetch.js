export const BASE_URL = 'http://localhost:3000';

// eslint-disable-next-line consistent-return
export async function getFetch(endpoint, token) {
  try {
    const resp = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.warn('erro in getFetch', error);
  }
}