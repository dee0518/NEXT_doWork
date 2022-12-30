import fetchData from 'lib/index';
import { iUserInfo } from 'types/auth';

export const postUser = async (data: iUserInfo) => {
  const json = await fetchData(`/api/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return json;
};

export const putUser = async (data: iUserInfo) => {
  const json = await fetchData(`/api/schedule`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return json;
};

export const patchUser = async (id: string, data) => {
  const json = await fetchData(`/api/auth/user/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return json;
};

export const getUser = async (id: string) => {
  const json = await fetchData(`/api/auth/user/${id}`);
  return json;
};
