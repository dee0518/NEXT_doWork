import SkeletonElement from 'components/Skeleton/SkeletonElement';
import Shimmer from 'components/Skeleton/Shimmer';
import ServiceMain from 'components/Common/ServiceMain';
import Wrapper from 'components/Common/Wrapper';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

const SkeletonScheduleMain = () => (
  <ServiceMain>
    <SkeletonElement type="input">
      <Shimmer />
    </SkeletonElement>
    <StatusBoardGrup>
      <SkeletonElement type="pannel__title" />
      <SkeletonElement type="pannel__title" />
    </StatusBoardGrup>
    <Wrapper>
      <CalendarHeader>
        <SkeletonElement type="middle__text" />
      </CalendarHeader>
      <WeeksGroup>
        <SkeletonElement type="small__text" />
        <SkeletonElement type="small__text" />
        <SkeletonElement type="small__text" />
        <SkeletonElement type="small__text" />
        <SkeletonElement type="small__text" />
        <SkeletonElement type="small__text" />
        <SkeletonElement type="small__text" />
      </WeeksGroup>
      <div>
        <CalendarWeek>
          <Schedule1 type="middle__text">
            <Shimmer />
          </Schedule1>
          <Schedule2 type="middle__text" />
        </CalendarWeek>
        <CalendarWeek>
          <Schedule3 type="middle__text" />
          <Schedule4 type="middle__text">
            <Shimmer />
          </Schedule4>
          <Schedule5 type="middle__text" />
        </CalendarWeek>
        <CalendarWeek>
          <Schedule6 type="middle__text" />
          <Schedule4 type="middle__text">
            <Shimmer />
          </Schedule4>
        </CalendarWeek>
        <CalendarWeek>
          <Schedule1 type="middle__text">
            <Shimmer />
          </Schedule1>
        </CalendarWeek>
      </div>
    </Wrapper>
  </ServiceMain>
);

export default SkeletonScheduleMain;

const StatusBoardGrup = styled.div`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
  margin: 20px 0 10px;

  div:first-child {
    width: 300px;
  }
`;

const CalendarHeader = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_20};

  & > div:first-child {
    margin: 0 auto;
  }
`;

const WeeksGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_20};

  div {
    width: 60%;
    margin: 0 auto;
  }
`;

const CalendarWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  height: 140px;
  padding-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_10};

  &:last-child {
    border-bottom: 0;
  }
`;

const Schedule1 = styled(SkeletonElement)`
  grid-column: 3 / 8;
  grid-row: 2 / 3;
  width: 100%;
  margin: 0;
`;

const Schedule2 = styled(Schedule1)`
  grid-column: 2 / 4;
  grid-row: 1 / 2;
  width: 100%;
`;

const Schedule3 = styled(Schedule1)`
  grid-column: 1 / 4;
  grid-row: 1 / 2;
`;

const Schedule4 = styled(Schedule1)`
  grid-column: 1 / 7;
  grid-row: 2 / 3;
`;

const Schedule5 = styled(Schedule1)`
  grid-column: 3 / 5;
  grid-row: 3 / 4;
`;

const Schedule6 = styled(Schedule5)`
  grid-column: 3 / 8;
  grid-row: 1 / 2;
`;
