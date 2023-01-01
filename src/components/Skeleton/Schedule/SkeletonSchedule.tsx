import GlobalNavBar from 'components/Common/GlobalNavBar';
import SkeletonSchedulePannel from 'components/Skeleton/Schedule/SkeletonSchedulePannel';
import SkeletonScheduleMain from 'components/Skeleton/Schedule/SkeletonSheduleMain';

const SkeletonSchedule = () => (
  <>
    <GlobalNavBar />
    <SkeletonSchedulePannel />
    <SkeletonScheduleMain />
  </>
);

export default SkeletonSchedule;
