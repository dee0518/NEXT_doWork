import styled from 'styled-components';
import { WEEK_EN, WEEK_KO } from 'constants/calendar';

type TProps = {
  type: string;
  lang: string;
  strLeng: number;
};

const CalendarWeek = ({ type, lang, strLeng }: TProps) => {
  const week: string[] = lang === 'ko' ? WEEK_KO : WEEK_EN.map(day => (strLeng ? day.slice(0, strLeng) : day));

  return (
    <WeekList className={`calendar__week ${type}`}>
      {week.map(day => (
        <li key={day}>{day}</li>
      ))}
    </WeekList>
  );
};

export default CalendarWeek;

const WeekList = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  line-height: 1.5;
  text-align: center;
  text-transform: capitalize;

  &.small {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.color_purple_80};
  }

  &.large {
    padding: 15px;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.color_gray_90};
  }
`;
