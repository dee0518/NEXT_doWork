import { useRef, useState, MouseEvent } from 'react';
import { deleteSchedule } from 'lib/schedule';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import Modal from 'components/Common/Modal';
import DetailContent from 'components/Schedule/DetailContent';
import styled from 'styled-components';
import { filterItem, iScheduleInfo } from 'types/schedule';
import { buttonNone } from 'styles/mixin';

const MoreScheduleModal = () => {
  const dispatch = useReduxDispatch();
  const { stringSelectedDate, searchKeyword, statusFilter, scheduleList } = useReduxSelector(state => state.schedule);
  const selectedDate = new Date(stringSelectedDate).getTime();
  const checkedFilter = statusFilter.filter(({ checked }: filterItem) => checked).map(({ id }: filterItem) => id);
  const filteredScheduleList = scheduleList.filter(({ title, status, fromDate, toDate }: iScheduleInfo) => {
    const isContained = fromDate <= selectedDate && selectedDate <= toDate;
    return title.includes(searchKeyword) && checkedFilter.includes(status) && isContained;
  });

  const liRef = useRef<HTMLLIElement | null>(null);
  const [openedId, setOpendId] = useState<string>('');

  const onOpen = (_id: string, e: MouseEvent<HTMLButtonElement>) => {
    if (liRef.current) liRef.current.className = 'close';

    if (openedId && openedId === _id) {
      liRef.current = null;
      setOpendId('');
    } else {
      liRef.current = (e.target as HTMLButtonElement).closest('li');
      setOpendId(_id);
    }
  };

  const onClose = () => {
    dispatch(scheduleActions.setIsShowMoreSchedule(false));
  };

  const onClickEdit = (_id: string) => {
    dispatch(scheduleActions.setScheduleDetail(_id));
    dispatch(scheduleActions.setIsShowEditedModal(true));
    dispatch(scheduleActions.setIsShowMoreSchedule(false));
  };

  const onClickDelete = async (_id: string) => {
    try {
      const deletedresponse = await deleteSchedule(_id);

      if (deletedresponse && deletedresponse.result) {
        dispatch(scheduleActions.setScheduleDetail(null));
        dispatch(scheduleActions.setFilterScheduleList(_id));
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Modal title="Month date" type="default" onClose={onClose} contentGroupClass="overflow">
      <ul>
        {filteredScheduleList.length > 0 &&
          filteredScheduleList.map((schedule: iScheduleInfo) => (
            <ScheduleItem
              key={schedule._id}
              className={`${openedId === schedule._id ? 'open' : ''} ${schedule.status}`}
            >
              <TitleBtn type="button" onClick={onOpen.bind(null, schedule._id)}>
                {schedule.title}
              </TitleBtn>
              <DetailWrapper>
                <DetailContent
                  type="more"
                  schedule={schedule}
                  onClickEdit={onClickEdit.bind(null, schedule._id)}
                  onClickDelete={onClickDelete}
                />
              </DetailWrapper>
            </ScheduleItem>
          ))}
      </ul>
    </Modal>
  );
};

export default MoreScheduleModal;

const ScheduleItem = styled.li`
  border-radius: 8px;

  &.open {
    & > button::after {
      transform: translate3d(0, -50%, 0) rotate(180deg);
    }

    & > div {
      height: auto;
      padding: 0 15px 15px;
    }
  }

  &.close {
  }

  &.todo {
    background: ${({ theme }) => theme.point_pink};
  }

  &.private {
    background: ${({ theme }) => theme.point_orange};
  }

  &.important {
    background: ${({ theme }) => theme.point_skyblue};
  }

  &.meeting {
    background: ${({ theme }) => theme.point_green};
  }
`;

const DetailWrapper = styled.div`
  height: 0;
  overflow: hidden;

  textarea {
    color: ${({ theme }) => theme.white};

    &.empty {
      color: ${({ theme }) => theme.color_gray_30};
    }
  }

  span {
    color: ${({ theme }) => theme.color_gray_10};
  }
`;

const TitleBtn = styled.button`
  ${buttonNone}
  position: relative;
  display: block;
  width: 100%;
  padding: 15px 13px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.white};
  text-align: left;

  &::after {
    content: '';
    position: absolute;
    right: 15px;
    top: 50%;
    width: 30px;
    height: 30px;
    background: url(/images/schedule/arrow_white.svg) no-repeat;
    background-position: center;
    transform: translate3d(0, -50%, 0);
  }
`;
