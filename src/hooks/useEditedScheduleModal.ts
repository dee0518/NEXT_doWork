import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import { initialSchedule } from 'constants/schedule';
import { iScheduleInfo, TCreatedScheduleInfo, TEditedScheduleInfo, TUserResultError } from 'types/schedule';
import { TDateObj } from 'types/calendar';
import { iUserInfo } from 'types/auth';
import { getScheduleByStartEnd, postSchedule, putSchedule } from 'lib/schedule';
import getFirstLastDate from 'utils/getFirstLastDate';
import { scheduleActions } from 'store/modules/schedule';
import { getYearMonthDate } from 'utils/dateUtils';

type TProps = {
  onCloseModal: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

const useEditedScheduleModal = ({ onCloseModal }: TProps) => {
  const dispatch = useReduxDispatch();
  const { scheduleDetail, stringSelectedDate, selectedMonthDates, isPressAddBtn } = useReduxSelector(
    state => state.schedule,
  );
  const { user } = useReduxSelector(state => state.auth);

  const today = new Date();
  const { year: tYear, month: tMonth, date: tDate } = getYearMonthDate(today);
  const { year, month, date } = getYearMonthDate(new Date(stringSelectedDate));
  const initialDate = isPressAddBtn ? new Date(tYear, tMonth, tDate) : new Date(year, month, date);

  const initialScheduleInfo = scheduleDetail || initialSchedule;
  const [scheduleInfo, setScheduleInfo] = useState<TEditedScheduleInfo | iScheduleInfo>(initialScheduleInfo);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>('');
  const [userResult, setUserResult] = useState<iUserInfo | TUserResultError | null>(null);
  const [dateObj, setDateObj] = useState<TDateObj>({
    today,
    selectedDate: new Date(),
    fromDate: scheduleDetail ? new Date(scheduleDetail.fromDate) : initialDate,
    toDate: scheduleDetail ? new Date(scheduleDetail.toDate) : initialDate,
  });

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (scheduleInfo.title.trim() === '') {
      setTitleError(true);
      return;
    }

    const { selectedDate, fromDate: from, toDate: to } = dateObj;
    const onlyDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const fromDate = from ? from.getTime() : onlyDate.getTime();
    const toDate = to ? to.getTime() : onlyDate.getTime();
    const data = { ...scheduleInfo, fromDate, toDate, user };

    try {
      setIsLoading(true);

      const editedResponse = scheduleDetail
        ? await putSchedule(data as iScheduleInfo)
        : await postSchedule(data as TCreatedScheduleInfo);

      const { firstDate, lastDate } = getFirstLastDate(new Date(stringSelectedDate), selectedMonthDates);
      const startAt = firstDate.getTime();
      const endAt = lastDate.getTime();
      const { email } = user;
      const getResponse = await getScheduleByStartEnd({ email, startAt, endAt });

      if (editedResponse && getResponse && editedResponse.result && getResponse.result) {
        dispatch(scheduleActions.setScheduleList(getResponse.data));
        onCloseModal(e);
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'collaborators') {
      setSearchUser(value);
      setUserResult(null);
      return;
    }

    if (name === 'title') {
      setTitleError(value.trim() === '');
    }

    setScheduleInfo(prev => ({ ...prev, [name]: value }));
  };

  const onInitUserResult = (e: MouseEvent) => {
    if (!userResult || (e.target as HTMLElement).closest('.add_collaborator')) return;
    setUserResult(null);
  };

  const onSearchUser = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const isIncluded = scheduleInfo.collaborators.find(collabor => collabor.email === searchUser);
    const isMe = searchUser === user.email;

    if (isIncluded) {
      setUserResult({ id: 'error', email: '이미 추가한 회원이에요:(', name: `You already added it` });
      return;
    }
    if (isMe) {
      setUserResult({ id: 'error', email: '본인은 추가할 수 없어요:(', name: `Don't add yourself` });
      return;
    }
    if (scheduleInfo.collaborators.length > 5) {
      setUserResult({ id: 'error', email: '5명까지만 추가할 수 있어요:)', name: `You can add up to 5 people` });
      return;
    }

    const response = await fetch(`/api/auth/userEmail`, {
      method: 'POST',
      body: JSON.stringify({ email: searchUser }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (json && json.result) {
      setUserResult(json.data);
    } else {
      setUserResult({ id: 'error', email: '일치하는 회원이 없어요:(', name: 'Not Found' });
    }
  };

  const onAddCollaborator = () => {
    if (userResult && userResult.id === 'error') return;
    setScheduleInfo(prev => ({
      ...prev,
      collaborators: [...prev.collaborators, userResult as iUserInfo],
    }));
    setSearchUser('');
    setUserResult(null);
  };

  const onDeleteCollaborator = (id: string) => {
    setScheduleInfo(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(collabor => collabor.id !== id),
    }));
  };

  const onClickDate = (type: string, date: Date) => {
    if (type === 'toDate' && dateObj.fromDate && dateObj.fromDate > date) return;
    if (type === 'fromDate' && dateObj.toDate && dateObj.toDate < date) {
      setDateObj(prev => ({ ...prev, fromDate: date, toDate: date }));
      return;
    }

    setDateObj(prev => ({ ...prev, [type]: date }));
  };

  const onClickHeaderBtn = (date: Date) => {
    setDateObj(prev => ({ ...prev, selectedDate: date }));
  };

  const onSetSelectedDate = (type: string) => {
    setDateObj(prev => ({ ...prev, selectedDate: prev[type] || prev.today }));
  };

  return {
    scheduleDetail,
    scheduleInfo,
    titleError,
    dateObj,
    isLoading,
    searchUser,
    userResult,
    onSubmit,
    onChange,
    onInitUserResult,
    onSearchUser,
    onAddCollaborator,
    onDeleteCollaborator,
    onClickDate,
    onClickHeaderBtn,
    onSetSelectedDate,
  };
};

export default useEditedScheduleModal;
