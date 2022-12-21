import { KeyboardEvent, MouseEvent, useState } from 'react';
import Calendar from 'components/Calendar';
import styled from 'styled-components';
import { changeDate } from 'utils/dateUtils';
import { TDateObj } from 'constants/calendar';
import { buttonNone } from 'styles/mixin';

type TProps = {
  dateObj: TDateObj;
  onClickDate: (date: Date, e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void;
  onClickHeaderBtn: (date: Date) => void;
};

const DatePicker = ({ dateObj, onClickDate, onClickHeaderBtn }: TProps) => {
  const [isShowCalendar, setIsShowCalendar] = useState<boolean>(false);

  const onOpenDatePicker = () => {
    setIsShowCalendar(true);
  };

  return (
    <DatePickerGroup>
      <DatePickerBtn className="datepicker__btn" type="button" onClick={onOpenDatePicker}>
        {changeDate(dateObj.selectedDate)}
      </DatePickerBtn>
      {isShowCalendar && (
        <Calendar
          dateObj={dateObj}
          type="small"
          lang="en"
          strLeng={3}
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
    width: 270px;
    padding: 15px;
    border-radius: 6px;
    background: ${({ theme }) => theme.white};
    box-shadow: ${({ theme }) => theme.color_purple_shadow};

    &.small {
      .calendar__header {
        grid-template-columns: 1fr 30px 30px;
        margin-bottom: 10px;

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
