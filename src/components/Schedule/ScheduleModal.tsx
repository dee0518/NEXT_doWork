import { useReduxSelector } from 'hooks/useRedux';
import { getYearMonthDate } from 'utils/dateUtils';
import Modal from 'components/Common/Modal';
import styled from 'styled-components';
import { iScheduleInfo } from 'types/schedule';

const ScheduleModal = () => {
  const { scheduleDetail } = useReduxSelector(state => state.schedule);
  const onClose = () => {};
  const { id, user, status, title, content, fromDate, fromTime, toDate, toTime, collaborators } =
    scheduleDetail as iScheduleInfo;

  const { year: fromYear, month: fromMonth, date: fromDate } = getYearMonthDate(new Date(fromDate));
  const { year: toYear, month: toMonth, date: toDate } = getYearMonthDate(new Date(toDate));

  const onClickEdit = () => {};
  const onClickDelete = () => {};

  return (
    <Modal type={status} title={title} onClose={onClose}>
      <Content
        readOnly
        className={content === '' ? 'empty' : ''}
        value={content === '' ? '내용이 비어 있어요:)' : content}
      />
      <div className="schedule__detail__modal__contents__bottom">
        <span className="member">{collaborators ? collaborators.length : 0} Members</span>
        <span className="date">{`${fromYear}.${fromMonth}.${fromDate} ${fromTime} - ${toYear}.${toMonth}.${toDate} ${toTime}`}</span>
      </div>
      <EditGroup>
        <EditBtn type="button" aria-label="일정 편집하기" onClick={onClickEdit} />
        <DeleteBtn type="button" aria-label="일정 삭제하기" onClick={onClickDelete} />
      </EditGroup>
    </Modal>
  );
};

export default ScheduleModal;

const Content = styled.textarea`
  padding: 20px;
`;

const EditGroup = styled.div`
  position: relative;
  text-align: right;

  &::after {
    content: '';
    position: abosolute;
    left: 20px;
    right: 0;
    width: calc(100% - 40px);
    height: 1px;
    background: ${({ theme }) => theme.color_gray_30};
  }
`;

const EditBtn = styled.button`
  width: 30px;
  height: 30px;
  background: url(images/schedule/edit.svg) no-repeat;
  background-position: center;
`;

const DeleteBtn = styled(EditBtn)`
  background-image: url(images/schedule/delete.svg);
`;
