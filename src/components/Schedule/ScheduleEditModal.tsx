import { MouseEvent } from 'react';
import Modal from 'components/Common/Modal';
import InputForm from 'components/Common/InputForm';
import DatePicker from 'components/Common/DatePicker';
import SelectBox from 'components/Common/SelectBox';
import Button from 'components/Common/Button';
import styled from 'styled-components';
import { buttonNone, flexbox } from 'styles/mixin';
import { statusList, timeList } from 'constants/schedule';

type TProps = {
  onClose: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

const ScheduleEditModal = ({ onClose }: TProps) => {
  const title = '';
  const searchUserKeyword = '';
  const content = '';
  const userSearch = null;
  const collaborators = ['adskjflkjaflsdjl'];
  const onSubmit = () => {};
  const onChange = () => {};
  const onAddCollaborator = () => {};
  const onDeleteCollaborator = () => {};
  const onClickDate = () => {};
  const onClickHeaderBtn = () => {};

  const dateObj = {
    today: new Date(),
    selectedDate: new Date(),
    fromDate: new Date(),
    toDate: new Date(),
  };

  return (
    <Modal title="New Schedule" type="default" onClose={onClose}>
      <Form onSubmit={onSubmit}>
        <StatusGroup className="new__schedule__form">
          {statusList.map(({ id, name, checked }) => (
            <StatusItem>
              <InputForm
                key={`new${id}`}
                input={{ id: `new${id}`, type: 'radio', name: 'status', onChange }}
                label={{ htmlFor: `new${id}`, className: `new_${id} ${checked ? 'on' : ''}`, children: name }}
              />
            </StatusItem>
          ))}
        </StatusGroup>
        <InputForm
          input={{
            id: 'title',
            type: 'text',
            name: 'title',
            value: title,
            placeholder: '새로운 일정을 알려주세요.',
            onChange,
            maxLength: '50',
          }}
          label={{ htmlFor: 'title', className: 'blind', children: '제목' }}
        />
        <TimeGroup className="new__schedule__form">
          <TimeTitle>시간</TimeTitle>
          <FromTime className="from">
            <DatePicker
              dateObj={dateObj}
              onClickDate={onClickDate.bind(null, 'from')}
              onClickHeaderBtn={onClickHeaderBtn.bind(null, 'from')}
            />
            <SelectBox id="fromTime" name="from" optionList={timeList} onChange={onChange} value="" />
          </FromTime>
          <ToTime className="to">
            <DatePicker
              dateObj={dateObj}
              onClickDate={onClickDate.bind(null, 'to')}
              onClickHeaderBtn={onClickHeaderBtn.bind(null, 'to')}
            />
            <SelectBox id="toTime" name="to" optionList={timeList} onChange={onChange} value="" />
          </ToTime>
        </TimeGroup>
        <InfoGroup className="new__schedule__form">
          <InputForm
            input={{
              id: 'collaborator',
              type: 'text',
              value: searchUserKeyword,
              name: 'collaborators',
              placeholder: 'abc@email.com',
              onChange,
            }}
            label={{ htmlFor: 'collaborator', children: '참석자' }}
          />
          {userSearch !== null && (
            <AddCollaborator
              className="add__collaborator"
              type="button"
              onClick={onAddCollaborator.bind(null, userSearch.email)}
            >
              <span>{userSearch.name}</span>
              <span>{userSearch.email}</span>
            </AddCollaborator>
          )}
          {collaborators.length > 0 && (
            <CollaboratorList>
              {collaborators.map(email => (
                <CollaboratorItem key={email}>
                  <span>{email}</span>
                  <button
                    type="button"
                    aria-label="delete collaborator"
                    onClick={onDeleteCollaborator.bind(null, email)}
                  />
                </CollaboratorItem>
              ))}
            </CollaboratorList>
          )}
        </InfoGroup>
        <InfoGroup className="new__schedule__form">
          <label htmlFor="content">내용</label>
          <Content id="content" placeholder="내용을 입력해주세요" name="content" value={content} onChange={onChange} />
        </InfoGroup>
        <SubmitBtn type="submit" category="primary">
          저장
        </SubmitBtn>
      </Form>
    </Modal>
  );
};

export default ScheduleEditModal;

const Form = styled.form`
  position: relative;
  padding: 20px 20px 65px;

  .input__form {
    margin-bottom: 15px;
  }
`;

const StatusGroup = styled.ul`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 20px;
  margin-bottom: 5px;
`;

const StatusItem = styled.li`
  input {
    display: none;
  }

  label {
    padding-left: 22px;
    font-size: 1.3rem;
    text-transform: capitalize;
    background: url(images/common/radio/empty.svg) no-repeat;
    background-position: left center;
    background-size: 14px;
  }

  .new_todo.on {
    background-image: url(images/common/radio/todo.svg);
  }

  .new_private.on {
    background-image: url(images/common/radio/private.svg);
  }

  .new_important.on {
    background-image: url(images/common/radio/important.svg);
  }

  .new_meeting.on {
    background-image: url(images/common/radio/meeting.svg);
  }
`;

const InfoGroup = styled.div`
  position: relative;
  padding-left: 60px;
  margin-bottom: 15px;

  label {
    position: absolute;
    left: 0;
    top: 10px;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color_gray_90};
  }
`;

const TimeGroup = styled(InfoGroup)`
  ${flexbox('row', 'nowrap', 'normal', 'center')}

  .select__box {
    padding: 10px;
    margin-left: 15px;
    border: none;
    background: transparent;
  }
`;

const TimeTitle = styled.span`
  position: absolute;
  left: 0;
  top: 10px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color_gray_90};
`;

const ToTime = styled.div`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  position: relative;
  width: 50%;
  padding: 35px 13px 5px;
  background: ${({ theme }) => theme.color_gray_10};
  border-radius: 0 4px 4px 0;

  .datepicker__btn,
  select {
    font-size: 1.3rem;
  }

  &::before {
    content: 'to';
    position: absolute;
    left: 13px;
    top: 13px;
    display: block;
    margin-bottom: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color_purple_80};
    text-transform: capitalize;
  }
`;

const FromTime = styled(ToTime)`
  border-radius: 4px 0 0 4px;

  &::before {
    content: 'from';
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 1px;
    height: 36px;
    background: ${({ theme }) => theme.color_gray_20};
    transform: translate3d(0, -50%, 0);
  }
`;

const AddCollaborator = styled.button`
  ${buttonNone}
  position: absolute;
  left: 60px;
  top: 45px;
  z-index: 1;
  width: calc(100% - 60px);
  padding: 13px;
  border-radius: 6px;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.color_gray_70};
  box-shadow: 0 2px 5px 2px rgba(213, 213, 213, 0.4);
  text-align: left;
  cursor: pointer;
  transition: all ease 0.3s;

  span {
    display: block;

    &:first-child {
      margin-bottom: 3px;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.color_gray_80};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.color_purple_10};

    span {
      color: ${({ theme }) => theme.color_purple_50};
    }
  }
`;

const CollaboratorList = styled.ul`
  ${flexbox('row', 'wrap', 'normal', 'center')}
`;

const CollaboratorItem = styled.li`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
  gap: 5px;
  padding: 0 5px 0 13px;
  border: 1px solid ${({ theme }) => theme.color_gray_70};
  border-radius: 20px;
  font-size: 1.2rem;
  line-height: 30px;
  color: ${({ theme }) => theme.color_gray_70};

  button {
    ${buttonNone}
    width: 30px;
    height: 30px;
    background: url(images/schedule/delete_gray.svg) no-repeat;
    background-position: center;
  }
`;

const Content = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  border: 0;
  border-radius: 6px;
  font-size: 1.3rem;
  line-height: 1.3;
  background: ${({ theme }) => theme.color_gray_10};
  resize: none;
`;

const SubmitBtn = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  height: 45px;
  line-height: 45px;
`;
