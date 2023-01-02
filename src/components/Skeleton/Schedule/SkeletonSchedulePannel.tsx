import SkeletonElement from 'components/Skeleton/SkeletonElement';
import SkeletonPannel from 'components/Skeleton/SkeletonPannel';
import Shimmer from 'components/Skeleton/Shimmer';
import styled from 'styled-components';

const SkeletonSchedulePannel = () => (
  <SkeletonPannel>
    <SkeletonElement type="pannel__title" />
    <SmallCalendar>
      <SkeletonElement type="content__title">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="small__calendar">
        <Shimmer />
      </SkeletonElement>
    </SmallCalendar>
    <StatusGroup>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
    </StatusGroup>
  </SkeletonPannel>
);

export default SkeletonSchedulePannel;

const SmallCalendar = styled.div`
  margin: 20px 0 50px;
  padding-top: 10px;
  border-top: 2px solid ${({ theme }) => theme.color_gray_10};

  div {
    width: 100%;
  }
`;

const StatusGroup = styled.div`
  div {
    width: 100%;
    margin-bottom: 15px;
  }
`;
