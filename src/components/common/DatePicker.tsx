import { KeyboardEvent, MouseEvent } from 'react';
import Calendar from 'components/Calendar';
import styled from 'styled-components';
import { changeDate } from 'utils/dateUtils';
import { TDateObj } from 'types/calendar';
import { buttonNone } from 'styles/mixin';
import getDates from 'utils/getDates';

type TProps = {
  isShowCalendar: boolean;
  visibleDate: Date;
  dateObj: TDateObj;
  onOpenDatePicker: () => void;
  onClickDate: (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  onClickHeaderBtn: (date: Date) => void;
};

const DatePicker = ({
  isShowCalendar,
  visibleDate,
  dateObj,
  onOpenDatePicker,
  onClickDate,
  onClickHeaderBtn,
}: TProps) => {
  const dates = getDates(dateObj.selectedDate);
  return (
    <DatePickerGroup className="datepicker">
      <DatePickerBtn className="datepicker__btn" type="button" onClick={onOpenDatePicker}>
        {changeDate(visibleDate)}
      </DatePickerBtn>
      {isShowCalendar && (
        <Calendar
          dateObj={dateObj}
          type="small"
          lang="en"
          strLeng={3}
          dates={dates}
          scheduleList={[]}
          onClickDate={onClickDate}
          onClickHeaderBtn={onClickHeaderBtn}
        />
      )}
    </DatePickerGroup>
  );
};

export default DatePicker;

const DatePickerGroup = styled.div`
  position: relative;

  .calendar {
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 1;
    width: 310px;
    padding: 15px;
    border-radius: 6px;
    background: ${({ theme }) => theme.white};
    box-shadow: ${({ theme }) => theme.color_purple_shadow};

    &.small {
      .calendar__header {
        grid-template-columns: 1fr 30px 30px;
        margin-bottom: 15px;

        span {
          font-size: 1.5rem;
        }

        .month__prev-btn,
        .month__next-btn {
          width: 30px;
          height: 30px;
          border: 0;
        }
      }

      .calendar__week__dates {
        padding: 0;
        background: transparent;
      }

      .calendar__week {
        padding: 10px 0;
        font-size: 1.1rem;
      }

      .calendar__dates {
        padding: 0;
        font-size: 1.2rem;
      }
    }
  }
`;

const DatePickerBtn = styled.button`
  ${buttonNone}
`;
