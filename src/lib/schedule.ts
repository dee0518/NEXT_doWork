import fetchData from 'lib/index';
import { TCreatedScheduleInfo, iScheduleInfo } from 'types/schedule';

type TGetSchedule = {
  startAt: number;
  endAt: number;
  email: string;
};

export const postSchedule = async (data: TCreatedScheduleInfo) => {
  const json = await fetchData(`/api/schedule`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return json;
};

export const putSchedule = async (data: iScheduleInfo) => {
  const json = await fetchData(`/api/schedule`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return json;
};

export const getScheduleByStartEnd = async ({ email, startAt, endAt }: TGetSchedule) => {
  const json = await fetchData(`api/schedule?email=${email}&startAt=${startAt}&endAt=${endAt}`);
  return json;
};

export const getOneSchedule = async (id: string) => {
  const json = await fetchData(`api/schedule/${id}`);
  return json;
};

export const deleteSchedule = async (id: string) => {
  const json = await fetchData(`api/schedule/${id}`, { method: 'DELETE' });
  return json;
};
