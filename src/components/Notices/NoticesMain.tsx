import Link from 'next/link';
import { changeDate } from 'utils/dateUtils';
import ContentInner from 'components/Common/ContentInner';
import Title from 'components/Common/Title';
import Wrapper from 'components/Common/Wrapper';
import Pagination from 'components/Common/Pagination';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import { iNotice } from 'types/notices';
import { NOTICES } from 'constants/navigation';

type TProps = {
  notices: iNotice[];
};

const NoticesMain = ({ notices }: TProps) => {
  return (
    <NoticesWrap>
      <ContentInner>
        <NoticesTopGroup>
          <Title className="home__title">Notices</Title>
        </NoticesTopGroup>
        <Table>
          <TableHeader>
            <TableHeaderRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>날짜</TableCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {notices.length > 0 &&
              notices.map(({ _id, title, created_at }, i) => (
                <TableRow key={_id} href={`${NOTICES}/${_id}`}>
                  <TableCell>{notices.length - i}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{changeDate(new Date(created_at))}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination total={2} current={1} />
      </ContentInner>
    </NoticesWrap>
  );
};

export default NoticesMain;

const NoticesWrap = styled.main`
  padding: 100px 0 80px;

  ${mediaQuery768} {
    padding: 150px 0;
  }
`;

const NoticesTopGroup = styled.div`
  margin-bottom: 30px;

  .search__form {
    margin-top: 15px;
  }

  ${mediaQuery768} {
    ${flexbox('row', 'nowrap', 'space-between', 'center')}

    .search__form {
      width: 380px;
      margin-top: 0;
    }
  }
`;

const Table = styled(Wrapper)`
  width: 100%;
  padding: 5px 0;

  ${mediaQuery768} {
    padding: 0;
    display: table;
  }
`;

const TableHeader = styled.div`
  display: none;

  ${mediaQuery768} {
    display: table-header-group;
    font-weight: bold;
    font-size: 1.8rem;
  }
`;

const TableHeaderRow = styled.div`
  display: none;

  ${mediaQuery768} {
    position: relative;
    display: table-row;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: ${({ theme }) => theme.color_gray_20};
    }
  }
`;

const TableRow = styled(Link)`
  position: relative;
  display: block;
  padding: 15px 15px 15px 50px;

  &:last-child {
    &::after {
      content: none;
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: 15px;
    bottom: 0;
    width: calc(100% - 30px);
    height: 1px;
    background: ${({ theme }) => theme.color_gray_20};
  }

  ${mediaQuery768} {
    display: table-row;
    padding: 0;

    &::after {
      left: 0;
      width: 100%;
    }
  }
`;

const TableBody = styled.div`
  ${mediaQuery768} {
    display: table-row-group;
  }
`;

const TableCell = styled.div`
  color: ${({ theme }) => theme.color_gray_100};
  font-size: 1.4rem;

  &:first-child {
    position: absolute;
    left: 15px;
    top: 50%;
    width: 28px;
    transform: translate3d(0, -50%, 0);
    text-align: center;
  }

  &:nth-child(2) {
    margin-bottom: 5px;
    font-size: 1.6rem;
  }

  &:last-child {
    color: ${({ theme }) => theme.color_gray_50};
  }

  ${mediaQuery768} {
    display: table-cell;
    padding: 25px 5px;
    font-size: 1.6rem;

    &:first-child {
      position: static;
      transform: none;
      width: 80px;
    }

    &:last-child {
      width: 140px;
      color: ${({ theme }) => theme.color_gray_100};
      text-align: center;
    }
  }
`;
