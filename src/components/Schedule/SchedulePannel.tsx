import useScheduleDate from 'hooks/useScheduleDate';
import Calendar from 'components/Calendar';
import SubPannel from 'components/Common/SubPannel';
import StatusFilter from 'components/Schedule/StatusFilter';

const SchedulePannel = () => {
  const { today, selectedDate, onClickDate, onClickHeaderBtn } = useScheduleDate();

  return (
    <SubPannel title="Schedule">
      <Calendar
        dateObj={{ today, selectedDate }}
        type="small"
        lang="en"
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
