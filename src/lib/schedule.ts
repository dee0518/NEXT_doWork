import fetchData from 'lib/index';
import { TCreatedScheduleInfo, iScheduleInfo } from 'types/schedule';

type TGetSchedule = {
  startAt: number;
  endAt: number;
};

export const postSchedule = async (data: TCreatedScheduleInfo | iScheduleInfo) => {
  const json = await fetchData(`/api/schedule`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return json;
};

export const getScheduleByStartEnd = async ({ startAt, endAt }: TGetSchedule) => {
  const json = await fetchData(`api/schedule?startAt=${startAt}&endAt=${endAt}`);
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
