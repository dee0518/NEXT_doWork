import { ChangeEvent, FormEvent } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import useScheduleDate from 'hooks/useScheduleDate';
import ServiceMain from 'components/Common/ServiceMain';
import Calendar from 'components/Calendar';
import EditedScheduleModal from 'components/Schedule/EditedScheduleModal';
import ScheduleDetailModal from 'components/Schedule//ScheduleDetailModal';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import { filterItem, iScheduleInfo } from 'types/schedule';
import MoreScheduleModal from './MoreScheduleModal';
import SearchForm from 'components/Common/SearchForm';

const ScheduleMain = () => {
  const dispatch = useReduxDispatch();
  const { dateObj, dates, onClickDate, onClickHeaderBtn } = useScheduleDate('timeline');
  const {
    searchKeyword,
    statusFilter,
    scheduleList,
    scheduleDetail,
    isShowEditedModal,
    isPressAddBtn,
    isShowMoreSchedule,
  } = useReduxSelector(state => state.schedule);
  const checkedFilter = statusFilter.filter(({ checked }: filterItem) => checked).map(({ id }: filterItem) => id);
  const filteredScheduleList = scheduleList.filter(
    ({ title, status }: iScheduleInfo) => title.includes(searchKeyword) && checkedFilter.includes(status),
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(scheduleActions.setSearchKeyword(e.target.value));
  };

  const onToggleModal = () => {
    dispatch(scheduleActions.setIsShowEditedModal(!isShowEditedModal));
  };

  const onCloseEditModal = () => {
    onToggleModal();
    if (scheduleDetail) dispatch(scheduleActions.setScheduleDetail(null));
    if (isPressAddBtn) dispatch(scheduleActions.setIsPressAddBtn(false));
  };

  const onClickAddBtn = () => {
    onToggleModal();
    dispatch(scheduleActions.setIsPressAddBtn(true));
  };

  return (
    <>
      {isShowEditedModal && <EditedScheduleModal onClose={onCloseEditModal} />}
      {!isShowEditedModal && scheduleDetail && <ScheduleDetailModal />}
      {isShowMoreSchedule && <MoreScheduleModal />}
      <SheduleMain>
        <SearchForm
          title="일정 검색"
          value={searchKeyword}
          placeholder="일정을 검색해주세요."
          onSubmit={onSubmit}
          onChange={onChange}
        />
        <ManageGroup>
          <StatusBoard>
            {(statusFilter as filterItem[]).map(({ id, count }) => (
              <BoardItem key={id}>
                <Badge className={id}>{id.slice(0, 1)}</Badge>
                <Count>{count}</Count>
              </BoardItem>
            ))}
          </StatusBoard>
          <AddBtn onClick={onClickAddBtn}>Add</AddBtn>
        </ManageGroup>
        <Calendar
          dateObj={dateObj}
          type="large"
          lang="en"
          dates={dates}
          strLeng={0}
          scheduleList={filteredScheduleList}
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
      </SheduleMain>
    </>
  );
};

export default ScheduleMain;

const SheduleMain = styled(ServiceMain)`
  .search__form {
    margin-bottom: 30px;
    min-width: 600px;
  }
`;

const ManageGroup = styled.div`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
  min-width: 600px;
  margin-bottom: 15px;
`;

const StatusBoard = styled.ul`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 15px;
`;

const BoardItem = styled.li`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 8px;
`;

const Badge = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 3px;
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 22px;
  color: ${({ theme }) => theme.white};
  text-align: center;
  text-transform: uppercase;

  &.all {
    background: ${({ theme }) => theme.color_purple_50};
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

const Count = styled.span`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color_gray_100};
`;

const AddBtn = styled.button`
  padding: 10px 20px 10px 35px;
  border: 1px solid ${({ theme }) => theme.color_gray_40};
  border-radius: 20px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color_gray_60};
  background: url(images/common/add_gray.svg) no-repeat;
  background-position: left 15px center;
  cursor: pointer;
`;
