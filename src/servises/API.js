import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
});
export const getWorkersList = async (page, count) => {
  const { data } = await instanceAxios.get(
    `/users?page=${page}&count=${count}`,
  );
  return data;
};
export const getPositionsId = async () => {
  const { data } = await instanceAxios.get(`/positions`);
  return data;
};
export const getToken = async () => {
  const { data } = await instanceAxios.get(`/token`);
  return data;
};

export const postWorkerData = async (token, body) => {
  try {
    const { data } = await instanceAxios.post(`/users`, body, {
      headers: {
        Token: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
