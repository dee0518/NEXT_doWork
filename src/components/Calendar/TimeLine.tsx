import { scheduleActions } from 'store/modules/schedule';
import { useReduxDispatch } from 'hooks/useRedux';
import getFirstLastDate from 'utils/getFirstLastDate';
import styled from 'styled-components';
import { buttonNone } from 'styles/mixin';
import { TTimeLine, iScheduleInfo } from 'types/schedule';

type TProps = {
  selectedDate: Date;
  dates: number[];
  scheduleList: iScheduleInfo[];
};

const TimeLine = ({ selectedDate, dates, scheduleList }: TProps) => {
  const dispatch = useReduxDispatch();

  const timeTableId: string[] = ['timeRow1', 'timeRow2', 'timeRow3', 'timeRow4', 'timeRow5', 'timeRow6'];
  const timeTable: TTimeLine[][] = Array.from(new Array(dates.length / 7), () => []);
  const month = selectedDate.getMonth();
  const clacGapDay = (time: number): number => time / (1000 * 60 * 60 * 24);

  scheduleList.forEach(({ _id, status, fromDate, toDate, title }) => {
    const { firstDate, lastDate } = getFirstLastDate(new Date(selectedDate), dates);

    const from = new Date(fromDate) < firstDate ? firstDate : new Date(fromDate);
    const to = new Date(toDate) > lastDate ? lastDate : new Date(toDate);

    const gapTime = to.getTime() - from.getTime();
    let gapDay = clacGapDay(gapTime);

    const fMonth = from.getMonth();
    const fDate = from.getDate();
    const fDay = from.getDay();

    let startWeekIdx =
      fMonth < month
        ? 0
        : fMonth > month
        ? timeTable.length - 1
        : Math.floor(dates.indexOf(fDate, fDate > 10 ? 6 : 0) / 7);
    let isStarted = true;
    let moreTop = false;

    while (gapDay >= 0 && startWeekIdx < timeTable.length) {
      const start = isStarted ? fDay : 0;
      const end = isStarted ? (fDay + gapDay > 6 ? 6 : fDay + gapDay) : gapDay < 7 ? gapDay : 6;
      const standard = [0, 1, 2, 3, 4];

      timeTable[startWeekIdx].forEach(t => {
        if (!(t.start > end || t.end < start)) standard.splice(standard.indexOf(t.top), 1);
      });
      const top = standard[0] === undefined ? 5 : standard[0];
      if (top === 5) moreTop = true;

      timeTable[startWeekIdx] = [...timeTable[startWeekIdx], { _id, type: status, top, start, end, title }];
      startWeekIdx += 1;
      gapDay -= isStarted ? 7 - fDay : 7;
      if (isStarted) isStarted = false;
      if (moreTop) break;
    }
  });

  const onClick = (_id: string) => {
    dispatch(scheduleActions.setScheduleDetail(_id));
  };

  const onClickMore = (x: number, y: number) => {
    dispatch(scheduleActions.setIsShowMoreSchedule(true));
    dispatch(scheduleActions.setStringDateByPosition({ x, y }));
  };

  return (
    <TimeLineTable>
      {timeTable.length > 0 &&
        timeTable.map((times, i) => (
          <TimeLineRow key={timeTableId[i]}>
            {times.map(({ _id, type, top, start, end, title }: TTimeLine, _, self) =>
              top === 5 ? null : self.length > 5 && top === 4 ? (
                <TimeLineBtn
                  key={_id}
                  type="button"
                  className="more"
                  onClick={onClickMore.bind(null, start, i)}
                  style={{
                    left: `${(100 / 7) * start}%`,
                    top: `${top * 28 + 40}px`,
                    width: `${100 / 7}%`,
                  }}
                >
                  더보기
                </TimeLineBtn>
              ) : (
                <TimeLineBtn
                  key={_id}
                  type="button"
                  className={type}
                  onClick={onClick.bind(null, _id)}
                  style={{
                    left: `${(100 / 7) * start}%`,
                    top: `${top * 28 + 40}px`,
                    width: `${((end - start + 1) * 100) / 7}%`,
                  }}
                >
                  {title}
                </TimeLineBtn>
              ),
            )}
          </TimeLineRow>
        ))}
    </TimeLineTable>
  );
};

export default TimeLine;

const TimeLineTable = styled.div`
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
`;
const TimeLineRow = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
`;
const TimeLineBtn = styled.button`
  ${buttonNone}
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  top: 36px;
  padding: 6px 8px;
  border-radius: 4px;
  color: ${({ theme }) => theme.white};
  font-size: 1.3rem;
  background: ${({ theme }) => theme.color_purple_60};
  text-align: left;
  cursor: pointer;

  &.todo {
    background: ${({ theme }) => theme.point_pink};
  }

  &.private {
    background: ${({ theme }) => theme.point_orange};
  }

  &.meeting {
    background: ${({ theme }) => theme.point_green};
  }

  &.important {
    background: ${({ theme }) => theme.point_skyblue};
  }
`;
