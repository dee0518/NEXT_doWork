import GlobalNavBar from 'components/Common/GlobalNavBar';
import SkeletonSchedulePannel from 'components/Skeleton/Schedule/SkeletonSchedulePannel';
import SkeletonScheduleMain from './SkeletonSheduleMain';

const SkeletonSchedule = () => (
  <>
    <GlobalNavBar />
    <SkeletonSchedulePannel />
    <SkeletonScheduleMain />
  </>
);

export default SkeletonSchedule;
