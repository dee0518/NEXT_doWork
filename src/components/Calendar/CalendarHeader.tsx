import { MouseEvent } from 'react';
import styled from 'styled-components';
import { buttonNone, flexbox } from 'styles/mixin';

type TProps = {
  date: Date;
  type: string;
  onClickHeaderBtn: (date: Date) => void;
};

const CalendarHeader = ({ date, type, onClickHeaderBtn }: TProps) => {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const isPrevBtn = (e.target as HTMLButtonElement).classList.contains('month__prev-btn');
    const year = date.getFullYear();
    const month = date.getMonth() + (isPrevBtn ? -1 : 1);
    const curDate = date.getDate();

    onClickHeaderBtn(new Date(year, month, curDate));
  };

  return (
    <CalendarHeaderWrapper className={`calendar__header ${type}`}>
      <MonthBtn className={`month__prev-btn ${type}`} aria-label="prev month" type="button" onClick={onClick} />
      <Span className={type}>
        {date.toLocaleString('en-US', { month: 'long' })}
        {`, ${date.getFullYear()}`}
      </Span>
      <MonthBtn className={`month__next-btn ${type}`} aria-label="next month" type="button" onClick={onClick} />
    </CalendarHeaderWrapper>
  );
};

export default CalendarHeader;

const CalendarHeaderWrapper = styled.div`
  display: grid;

  &.small {
    grid-template-columns: 1fr 36px 36px;
    grid-template-rows: 1fr;
    grid-gap: 5px;
    margin-bottom: 25px;
  }

  &.large {
    ${flexbox('row', 'nowrap', 'center', 'center')}
    border-bottom: 1px solid ${({ theme }) => theme.color_gray_40};
    padding: 20px 0;
  }
`;

const MonthBtn = styled.button`
  ${buttonNone}

  &.small {
    width: 36px;
    height: 36px;
    border: 1px solid ${({ theme }) => theme.color_gray_30};
    border-radius: 6px;
    background: ${({ theme }) => theme.white} url(/images/common/calendar/arrow_small.svg) no-repeat center;

    &.month__prev-btn {
      grid-row: 1;
      grid-column: 2;
    }

    &.month__next-btn {
      grid-row: 1;
      grid-column: 3;
      transform: scaleX(-1);
    }
  }

  &.large {
    width: 40px;
    height: 40px;
    background: url(/images/common/calendar/arrow_large.svg) no-repeat;
    background-size: 14px;
    background-position: center;

    &.month__next-btn {
      transform: rotate(180deg);
    }
  }
`;

const Span = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.color_gray_100};

  &.small {
    grid-column: 1;
    grid-row: 1;
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 36px;
  }

  &.large {
    margin: 0 15px;
    font-size: 2rem;
    line-height: 1.5;
  }
`;
