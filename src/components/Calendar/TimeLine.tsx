import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import getFirstLastDate from 'utils/getFirstLastDate';
import { scheduleActions } from 'store/modules/schedule';
import styled from 'styled-components';
import { TTimeLine } from 'types/schedule';

const TimeList = ({ month, dates, filterScheduleList }) => {
  const dispatch = useReduxDispatch();
  const { selectedDate, selectedMonthDates } = useReduxSelector(state => state.schedule);

  const timeTable: TTimeLine[][] = Array.from(new Array(dates.length / 7), () => []);
  const clacGapDay = (time: number): number => time / (1000 * 60 * 60 * 24);

  filterScheduleList.forEach(({ id, status, fromDate, toDate, title }) => {
    const { firstDate, lastDate } = getFirstLastDate(new Date(selectedDate), selectedMonthDates);

    const from = new Date(fromDate) < firstDate ? firstDate : new Date(fromDate);
    const to = new Date(toDate) > lastDate ? lastDate : new Date(toDate);

    const fromAt = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const toAt = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    const gapTime = toAt.getTime() - fromAt.getTime();
    let gapDay = clacGapDay(gapTime);

    const fromM = from.getMonth();
    const fromD = from.getDate();
    const fromDay = from.getDay();

    let startArrIdx =
      fromM === month
        ? Math.floor(dates.findIndex((val, i) => (fromD < 10 ? val === fromD : i > 5 && val === fromD)) / 7)
        : fromM === month - 1
        ? 0
        : timeTable.length - 1;

    let isStarted = true;
    while (gapDay >= 0 && startArrIdx < timeTable.length) {
      const start = isStarted ? fromDay : 0;
      const end = isStarted ? (fromDay + gapDay > 6 ? 6 : fromDay + gapDay) : gapDay < 7 ? gapDay : 6;
      const standard = [0, 1, 2, 3, 4];
      timeTable
        .find((_, i) => i === startArrIdx)
        .forEach(t => {
          if ((t.start <= start && start <= t.end) || (t.start <= end && end <= t.end))
            standard.splice(standard.indexOf(t.top), 1);
        });
      const top = standard.shift();

      timeTable[startArrIdx] = [...timeTable[startArrIdx], { id, type: status, top, start, end, title }];
      gapDay -= isStarted ? 7 - fromDay : 7;
      startArrIdx += 1;
      if (isStarted) isStarted = false;
    }
  });

  const onClick = (id, _) => {
    dispatch(scheduleActions.setEditedScheduleId(id));
  };

  return (
    <TimeLineTable>
      {timeTable.length > 0 &&
        timeTable.map((times, i) => (
          <TimeLineRow key={times}>
            {times.map(({ id, type, top, start, end, title }: TTimeLine, i) => (
              <TimeLineBtn
                key={id}
                type="button"
                className={`time__table__schedule  ${type}`}
                onClick={onClick.bind(null, id)}
                style={{
                  left: `${(100 / 7) * start}%`,
                  top: `${top * 29 + 36}px`,
                  width: `${((end - start + 1) * 100) / 7}%`,
                }}
              >
                {title}
              </TimeLineBtn>
            ))}
          </TimeLineRow>
        ))}
    </TimeLineTable>
  );
};

export default TimeList;

const TimeLineTable = styled.div``;
const TimeLineRow = styled.div``;
const TimeLineBtn = styled.button``;
