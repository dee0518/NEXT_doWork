import { getYearMonthDate } from 'utils/dateUtils';
import styled from 'styled-components';
import { buttonNone, flexbox } from 'styles/mixin';
import { iScheduleInfo } from 'types/schedule';

type TProps = {
  schedule: iScheduleInfo;
  onClickEdit: () => void;
  onClickDelete: (_id: string) => void;
};

const DetailContent = ({ schedule, onClickEdit, onClickDelete }: TProps) => {
  const { _id, user, content, fromDate, fromTime, toDate, toTime, collaborators } = schedule;
  const { year: fYear, month: fMonth, date: fDate } = getYearMonthDate(new Date(fromDate));
  const { year: tYear, month: tMonth, date: tDate } = getYearMonthDate(new Date(toDate));

  return (
    <>
      <Content
        readOnly
        className={content === '' ? 'empty' : ''}
        value={content === '' ? '내용이 비어 있어요:)' : content}
      />
      <InfoGroup>
        <Info>{collaborators ? collaborators.length : 0} Members</Info>
        <Info>{`${fYear}.${fMonth + 1}.${fDate} ${fromTime} - ${tYear}.${tMonth + 1}.${tDate} ${toTime}`}</Info>
      </InfoGroup>
      <EditGroup>
        <Creator>@{user.name}</Creator>
        <EditBtn type="button" aria-label="일정 편집하기" onClick={onClickEdit} />
        <DeleteBtn type="button" aria-label="일정 삭제하기" onClick={onClickDelete.bind(null, _id)} />
      </EditGroup>
    </>
  );
};

export default DetailContent;

const Content = styled.textarea`
  width: 100%;
  min-height: 130px;
  margin-bottom: 10px;
  border: 0;
  resize: none;
  font-size: 1.5rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.color_gray_100};

  &.empty {
    color: ${({ theme }) => theme.color_gray_60};
  }
`;

const InfoGroup = styled.div`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
  padding-bottom: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_20};
`;

const Info = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color_gray_60};
`;

const EditGroup = styled.div`
  position: relative;
  padding-top: 10px;
  margin-bottom: -10px;
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

const Creator = styled.span`
  position: absolute;
  left: 0;
  font-size: 1.4rem;
  line-height: 30px;
  color: ${({ theme }) => theme.color_gray_70};
`;

const EditBtn = styled.button`
  ${buttonNone}
  width: 30px;
  height: 30px;
  margin-left: 8px;
  background: url(images/schedule/edit.svg) no-repeat;
  background-position: center;
`;

const DeleteBtn = styled(EditBtn)`
  background-image: url(images/schedule/delete.svg);
`;
