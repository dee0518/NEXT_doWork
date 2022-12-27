import { ChangeEvent } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import InputForm from 'components/Common/InputForm';
import styled from 'styled-components';
import { TFilter, filterItem } from 'types/schedule';

const StatusFilter = () => {
  const { statusFilter } = useReduxSelector(state => state.schedule);
  const dispatch = useReduxDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    dispatch(scheduleActions.setFilter(id as TFilter));
  };

  return (
    <StatusList>
      {(statusFilter as filterItem[]).map(({ id, name, checked }) => (
        <StatusItem key={id}>
          <InputForm
            input={{ id, type: 'checkbox', name: 'status', checked, onChange }}
            label={{ htmlFor: id, className: `${id} ${checked ? 'on' : ''}`, children: name }}
          />
        </StatusItem>
      ))}
    </StatusList>
  );
};

export default StatusFilter;

const StatusList = styled.ul`
  margin-top: 50px;
`;

const StatusItem = styled.li`
  div {
    margin-bottom: 8px;
  }

  input {
    display: none;
  }

  label {
    padding-left: 28px;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5;
    background: url(/images/common/checkbox/empty.svg) no-repeat;
    background-position: left center;
    background-size: 18px;
    text-transform: capitalize;
  }

  .all.on {
    background-image: url(/images/common/checkbox/all.svg);
  }

  .todo.on {
    background-image: url(/images/common/checkbox/todo.svg);
  }

  .private.on {
    background-image: url(/images/common/checkbox/private.svg);
  }

  .important.on {
    background-image: url(/images/common/checkbox/important.svg);
  }

  .meeting.on {
    background-image: url(/images/common/checkbox/meeting.svg);
  }
`;
