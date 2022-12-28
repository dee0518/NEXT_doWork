import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { useReduxSelector } from 'hooks/useRedux';
import { initialSchedule } from 'constants/schedule';
import { iScheduleInfo, TCreatedScheduleInfo, TEditedScheduleInfo, TUserResultError } from 'types/schedule';
import { TDateObj } from 'types/calendar';
import { iUserInfo } from 'types/auth';

type TProps = {
  onCloseModal: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

const useEditedScheduleModal = ({ onCloseModal }: TProps) => {
  const { scheduleDetail } = useReduxSelector(state => state.schedule);
  const { user } = useReduxSelector(state => state.auth);

  const initialScheduleInfo = scheduleDetail || initialSchedule;
  const [scheduleInfo, setScheduleInfo] = useState<TEditedScheduleInfo | iScheduleInfo>(initialScheduleInfo);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>('');
  const [userResult, setUserResult] = useState<iUserInfo | TUserResultError | null>(null);
  const [dateObj, setDateObj] = useState<TDateObj>({
    today: new Date(),
    selectedDate: new Date(),
    fromDate: scheduleDetail ? new Date(scheduleDetail.fromDate) : null,
    toDate: scheduleDetail ? new Date(scheduleDetail.toDate) : null,
  });

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (scheduleInfo.title.trim() === '') {
      setTitleError(true);
      return;
    }

    const { selectedDate, fromDate: from, toDate: to } = dateObj;
    const fromDate = from ? from.getTime() : selectedDate.getTime();
    const toDate = to ? to.getTime() : selectedDate.getTime();
    const data: TCreatedScheduleInfo | iScheduleInfo = { ...scheduleInfo, fromDate, toDate, user };
    const response = await fetch(`/api/schedule`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (json && json.result) {
      onCloseModal(e);
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
