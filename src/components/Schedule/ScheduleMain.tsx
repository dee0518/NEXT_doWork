import { ChangeEvent, FormEvent, useState } from 'react';
import { useReduxSelector } from 'hooks/useRedux';
import useScheduleDate from 'hooks/useScheduleDate';
import useModal from 'hooks/useModal';
import InputForm from 'components/Common/InputForm';
import ServiceMain from 'components/Common/ServiceMain';
import Calendar from 'components/Calendar';
import ScheduleModal from 'components/Schedule/ScheduleEditModal';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

const ScheduleMain = () => {
  const { today, selectedDate, onClickDate, onClickHeaderBtn } = useScheduleDate();
  const { statusFilter } = useReduxSelector(state => state.schedule);
  const { isShowModal, onToggleModal } = useModal();
  const [searchValue, setSearchValue] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClose = () => {};

  return (
    <>
      {isShowModal && <ScheduleModal onClose={onClose} />}
      <ServiceMain>
        <SearchForm onSubmit={onSubmit}>
          <InputForm
            input={{
              id: 'search',
              type: 'text',
              name: 'search',
              placeholder: '일정을 검색해보세요.',
              value: searchValue,
              onChange,
            }}
            label={{ htmlFor: 'search', className: 'blind', children: '일정 검색' }}
          />
        </SearchForm>
        <ManageGroup>
          <StatusBoard>
            {statusFilter.map(({ id, count }) => (
              <BoardItem key={id}>
                <Badge className={id}>{id.slice(0, 1)}</Badge>
                <Count>{count}</Count>
              </BoardItem>
            ))}
          </StatusBoard>
          <AddBtn onClick={onToggleModal}>Add</AddBtn>
        </ManageGroup>
        <Calendar
          dateObj={{ today, selectedDate }}
          type="large"
          lang="en"
          strLeng={0}
          scheduleList={[]}
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
      </ServiceMain>
    </>
  );
};

export default ScheduleMain;

const SearchForm = styled.form`
  margin-bottom: 30px;

  input {
    padding: 15px;
    border-radius: 6px;
  }
`;

const ManageGroup = styled.div`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
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
