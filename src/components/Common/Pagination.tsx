import Link from 'next/link';
import { NOTICES } from 'constants/navigation';
import styled from 'styled-components';
import { buttonNone, flexbox } from 'styles/mixin';
import { mediaQuery768 } from 'styles/mediaQuery';

type TProps = {
  total: number;
  current: number;
};

const Pagination = ({ total, current }: TProps) => {
  const curPageStart = Math.floor(current / 10) * 10 + 1;
  const totalPage = Math.ceil(total / 10);
  const pages = new Array(10)
    .fill(0)
    .map((_, i) => curPageStart + i)
    .filter(val => val <= totalPage);

  return (
    <Wrapper>
      <ControlBtn aria-label="이전" />
      <PageList>
        {pages.map(page => {
          if (page === current)
            return (
              <PageItem key="page">
                <span>{page}</span>
              </PageItem>
            );
          else
            return (
              <PageItem key="page">
                <Link href={`${NOTICES}?page=${page}`}>{page}</Link>
              </PageItem>
            );
        })}
      </PageList>
      <ControlBtn aria-label="다음" className="next" />
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  ${flexbox('row', 'nowrap', 'center', 'center')}
  gap: 20px;
  margin: 15px 0;

  ${mediaQuery768} {
    margin: 25px 0;
  }
`;

const ControlBtn = styled.button`
  ${buttonNone};
  width: 30px;
  height: 30px;
  background: url(/images/common/calendar/arrow_large.svg) no-repeat;
  background-size: 14px;
  background-position: center;

  &.next {
    transform: rotate(180deg);
  }
`;

const PageList = styled.ul`
  ${flexbox('row', 'nowrap', 'center', 'center')}
  gap: 5px;
`;

const PageItem = styled.li`
  font-size: 1.6rem;
  line-height: 1.5;

  span,
  a {
    display: block;
    padding: 5px;
  }

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.point_orange};
  }
`;
