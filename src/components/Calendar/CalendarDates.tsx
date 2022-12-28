import { MouseEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { getYearMonthDate } from 'utils/dateUtils';
import { TDateClass, TDateObj } from 'types/calendar';

type TProps = {
  type: string;
  dates: number[];
  onClickDate: (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  dateObj: TDateObj;
};

const CalendarDates = ({ type, dateObj, dates, onClickDate }: TProps) => (
  <DateList className={`calendar__dates ${type}`}>
    {dates.map((curDate, i) => {
      const delta: number = i < 7 && curDate > 20 ? -1 : i > 24 && curDate < 7 ? 1 : 0;
      const { year: todayYear, month: todayMonth, date: todayDate } = getYearMonthDate(dateObj.today);
      const { year: selectedYear, month: selectedMonth } = getYearMonthDate(dateObj.selectedDate);

      const month: number = selectedMonth + delta;
      const newDate: Date = new Date(selectedYear, month, curDate);
      let dateClass: TDateClass = '';

      if (delta === -1 || delta === 1) dateClass = 'other';
      else if (selectedYear === todayYear && month === todayMonth && curDate === todayDate) dateClass = 'today';
      if (dateObj.fromDate || dateObj.toDate) {
        let from = null;
        let to = null;

        if (dateObj.fromDate) from = getYearMonthDate(dateObj.fromDate);
        if (dateObj.toDate) to = getYearMonthDate(dateObj.toDate);

        if (from && selectedYear === from.year && month === from.month && curDate === from.date) dateClass = 'from';
        if (to && selectedYear === to.year && month === to.month && curDate === to.date) dateClass = 'to';
        if (
          from &&
          to &&
          (selectedYear > from.year ||
            (selectedYear === from.year && (month > from.month || (month === from.month && curDate >= from.date)))) &&
          (selectedYear < to.year ||
            (selectedYear === to.year && (month < to.month || (month === to.month && curDate <= to.date))))
        )
          dateClass += ' term';
        if (
          from &&
          selectedYear === from.year &&
          month === from.month &&
          curDate === from.date &&
          to &&
          selectedYear === to.year &&
          month === to.month &&
          curDate === to.date
        )
          dateClass = 'from';
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

        &.term {
          color: ${({ theme }) => theme.point_orange};
          background: ${({ theme }) => theme.color_purple_10};
        }
      }

      &.from,
      &.to {
        div {
          position: relative;
          z-index: 1;
          border-radius: 50%;
          background: ${({ theme }) => theme.color_purple_50};
          color: ${({ theme }) => theme.white};
        }

        &.term {
          position: relative;
          border-radius: 50%;
          background: ${({ theme }) => theme.color_purple_50};
          color: ${({ theme }) => theme.white};

          &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 50%;
            height: 100%;
            background: ${({ theme }) => theme.color_purple_10};
          }
        }
      }

      &.to.term {
        &::before {
          right: auto;
          left: 0;
        }
      }

      &.term {
        color: ${({ theme }) => theme.color_gray_100};
        background: ${({ theme }) => theme.color_purple_10};

        &:hover {
          border-radius: 0;
          background: ${({ theme }) => theme.color_purple_10};

          div {
            border-radius: 50%;
            background: ${({ theme }) => theme.color_purple_70};
          }
        }
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
