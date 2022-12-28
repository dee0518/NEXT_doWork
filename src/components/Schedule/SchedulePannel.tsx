import useScheduleDate from 'hooks/useScheduleDate';
import Calendar from 'components/Calendar';
import SubPannel from 'components/Common/SubPannel';
import StatusFilter from 'components/Schedule/StatusFilter';

const SchedulePannel = () => {
  const { dateObj, dates, onClickDate, onClickHeaderBtn } = useScheduleDate('schedulePannel');

  return (
    <SubPannel title="Schedule">
      <Calendar
        dateObj={dateObj}
        type="small"
        lang="en"
        dates={dates}
        strLeng={3}
        scheduleList={[]}
        onClickDate={onClickDate}
        onClickHeaderBtn={onClickHeaderBtn}
      />
      <StatusFilter />
    </SubPannel>
  );
};

export default SchedulePannel;
