import { MouseEvent } from 'react';
import useEditedScheduleModal from 'hooks/useEditedScheduleModal';
import useDatepicker from 'hooks/useDatepicker';
import Modal from 'components/Common/Modal';
import InputForm from 'components/Common/InputForm';
import DatePicker from 'components/Common/DatePicker';
import SelectBox from 'components/Common/SelectBox';
import Button from 'components/Common/Button';
import styled from 'styled-components';
import { buttonNone, flexbox } from 'styles/mixin';
import { statusList, timeList } from 'constants/schedule';
import Loading from 'components/Common/Loading';

type TProps = {
  onClose: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

const EditedScheduleModal = ({ onClose }: TProps) => {
  const {
    isLoading,
    titleError,
    scheduleDetail,
    scheduleInfo,
    searchUser,
    userResult,
    dateObj,
    onSubmit,
    onChange,
    onSearchUser,
    onInitUserResult,
    onAddCollaborator,
    onDeleteCollaborator,
    onSetSelectedDate,
    onClickDate,
    onClickHeaderBtn,
  } = useEditedScheduleModal({ onCloseModal: onClose });
  const { opendDatepicker, onOpenDatepicker, onCloseDatepicker } = useDatepicker();
  const { title, status, fromTime, toTime, collaborators, content } = scheduleInfo;

  const onClickInputDate = (type: string) => {
    onSetSelectedDate(type);
    onOpenDatepicker(type);
  };

  const onClickDatepickerDate = (type: string, date: Date) => {
    onClickDate(type, date);
    onOpenDatepicker('');
  };

  const onClickBg = (e: MouseEvent<HTMLElement>) => {
    onCloseDatepicker(e);
    onInitUserResult(e);
  };

  return (
    <>
      {isLoading && <Loading />}
      <Modal
        title={scheduleDetail ? 'Edit Schedule' : 'New Schedule'}
        type={scheduleDetail ? scheduleDetail.status : 'default'}
        onClose={onClose}
        onClickBg={onClickBg}
      >
        <Div>
          <StatusGroup>
            {statusList.map(({ id, name }) => (
              <StatusItem key={`new${id}`}>
                <InputForm
                  input={{ id: `new${id}`, type: 'radio', name: 'status', value: id, onChange }}
                  label={{ htmlFor: `new${id}`, className: `new_${id} ${status === id ? 'on' : ''}`, children: name }}
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
              className: titleError ? 'error' : '',
              placeholder: '새로운 일정을 알려주세요.',
              onChange,
              maxLength: '50',
            }}
            label={{ htmlFor: 'title', className: 'blind', children: '제목' }}
          />
          <TimeGroup>
            <TimeTitle>시간</TimeTitle>
            <FromTime>
              <DatePicker
                isShowCalendar={opendDatepicker === 'fromDate'}
                visibleDate={dateObj.fromDate || dateObj.today}
                dateObj={dateObj}
                onOpenDatePicker={onClickInputDate.bind(null, 'fromDate')}
                onClickDate={onClickDatepickerDate.bind(null, 'fromDate')}
                onClickHeaderBtn={onClickHeaderBtn}
              />
              <SelectBox id="fromTime" name="fromTime" optionList={timeList} onChange={onChange} value={fromTime} />
            </FromTime>
            <ToTime>
              <DatePicker
                isShowCalendar={opendDatepicker === 'toDate'}
                visibleDate={dateObj.toDate || dateObj.today}
                dateObj={dateObj}
                onOpenDatePicker={onClickInputDate.bind(null, 'toDate')}
                onClickDate={onClickDatepickerDate.bind(null, 'toDate')}
                onClickHeaderBtn={onClickHeaderBtn}
              />
              <SelectBox id="toTime" name="toTime" optionList={timeList} onChange={onChange} value={toTime} />
            </ToTime>
          </TimeGroup>
          <InfoGroup>
            <InputForm
              input={{
                id: 'collaborators',
                type: 'text',
                value: searchUser,
                name: 'collaborators',
                placeholder: 'abc@email.com',
                onChange,
                onKeyUp: onSearchUser,
                autoComplete: 'off',
              }}
              label={{ htmlFor: 'collaborators', children: '참석자' }}
            />
            {userResult && (
              <AddCollaborator
                className={`${userResult.id === 'error' ? 'error' : ''} add_collaborator`}
                type="button"
                onClick={onAddCollaborator.bind(null, userResult.email)}
              >
                <span>{userResult.name}</span>
                <span>{userResult.email}</span>
              </AddCollaborator>
            )}
            {collaborators.length > 0 && (
              <CollaboratorList>
                {collaborators.map(({ id, email }) => (
                  <CollaboratorItem key={id}>
                    <span>{email}</span>
                    <button
                      type="button"
                      aria-label="delete collaborator"
                      onClick={onDeleteCollaborator.bind(null, id)}
                    />
                  </CollaboratorItem>
                ))}
              </CollaboratorList>
            )}
          </InfoGroup>
          <InfoGroup>
            <label htmlFor="content">내용</label>
            <Content
              id="content"
              placeholder="내용을 입력해주세요"
              name="content"
              value={content}
              onChange={onChange}
            />
          </InfoGroup>
          <SubmitBtn type="button" category="primary" onClick={onSubmit}>
            저장
          </SubmitBtn>
        </Div>
      </Modal>
    </>
  );
};

export default EditedScheduleModal;

const Div = styled.div`
  position: relative;
  padding-bottom: 45px;

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

  .datepicker {
    width: 72px;
  }

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

  &.error {
    cursor: auto;

    &:hover {
      background-color: ${({ theme }) => theme.white};

      span {
        color: ${({ theme }) => theme.color_gray_70};

        &:first-child {
          color: ${({ theme }) => theme.color_gray_80};
        }
      }
    }
  }
`;

const CollaboratorList = styled.ul`
  ${flexbox('row', 'wrap', 'normal', 'center')}
  gap: 10px;
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
  right: 0;
  bottom: 0;
  width: 150px;
  height: 45px;
  line-height: 45px;
`;
