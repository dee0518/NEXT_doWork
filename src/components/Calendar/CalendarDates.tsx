import { MouseEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import getYearMonthDate from 'utils/getYearMonthDate';
import { TDateClass, TDateObj } from 'constants/calendar';

type TProps = {
  type: string;
  dates: number[];
  onClickDate: (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  dateObj: TDateObj;
};

const CalendarDates = ({ type, dateObj, dates, onClickDate }: TProps) => (
  <DateList className={type}>
    {dates.map((curDate, i) => {
      const delta: number = i < 7 && curDate > 20 ? -1 : i > 24 && curDate < 7 ? 1 : 0;
      const { year: todayYear, month: todayMonth, date: todayDate } = getYearMonthDate(dateObj.today);
      const { year: selectedYear, month: selectedMonth } = getYearMonthDate(dateObj.selectedDate);

      const month: number = selectedMonth + delta;
      const newDate: Date = new Date(selectedYear, month, curDate);
      let dateClass: TDateClass = '';

      if (delta === -1 || delta === 1) dateClass = 'other';
      else if (selectedYear === todayYear && month === todayMonth && curDate === todayDate) dateClass = 'today';
      else if (dateObj.fromDate && dateObj.toDate) {
        const { year: fromYear, month: fromMonth, date: fromDate } = getYearMonthDate(dateObj.fromDate);
        const { year: toYear, month: toMonth, date: toDate } = getYearMonthDate(dateObj.toDate);

        if (selectedYear === fromYear && selectedMonth === fromMonth && curDate === fromDate) dateClass = 'from';
        else if (selectedYear === toYear && selectedMonth === toMonth && curDate === toDate) dateClass = 'to';
        else if (selectedYear === toYear && selectedMonth === toMonth && curDate > fromDate && curDate < toDate)
          dateClass = 'term';
      }

      return (
        <li key={`${month}-${curDate}`} className={dateClass}>
          <div
            tabIndex={0}
            onClick={onClickDate.bind(null, newDate)}
            onKeyUp={onClickDate.bind(null, newDate)}
            role="button"
          >
            {curDate}
          </div>
        </li>
      );
    })}
  </DateList>
);

export default CalendarDates;

const DateList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  line-height: 40px;

  li {
    color: ${({ theme }) => theme.color_gray_100};
    font-weight: 400;
    font-size: 1.4rem;
    cursor: pointer;

    &.other {
      color: ${({ theme }) => theme.color_gray_60};
    }
  }

  &.small {
    padding: 15px 0;
    text-align: center;

    li {
      &.today {
        color: ${({ theme }) => theme.point_orange};
        font-weight: bold;
      }

      &.from,
      &.to {
        border-radius: 50%;
        background: ${({ theme }) => theme.color_purple_50};
        color: ${({ theme }) => theme.white};
      }

      &.term {
        background: ${({ theme }) => theme.color_purple_10};
        color: ${({ theme }) => theme.color_gray_100};
      }

      &:hover {
        border-radius: 50%;
        background: ${({ theme }) => theme.color_purple_50};
        color: ${({ theme }) => theme.white};
      }
    }
  }

  &.large {
    li {
      height: 180px;
      padding: 10px 15px;
      border-top: 1px solid ${({ theme }) => theme.color_gray_30};
      font-size: 1.5rem;
      line-height: 1.5;
    }
  }
`;
