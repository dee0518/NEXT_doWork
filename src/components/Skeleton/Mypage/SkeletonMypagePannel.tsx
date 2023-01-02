import SkeletonElement from 'components/Skeleton/SkeletonElement';
import SkeletonPannel from 'components/Skeleton/SkeletonPannel';
import Shimmer from 'components/Skeleton/Shimmer';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

const SkeletonMypagePannel = () => (
  <SkeletonPannel>
    <SkeletonElement type="pannel__title" />
    <InfoGroup>
      <SkeletonElement type="middle__avatar" />
      <MyInfoGroup>
        <SkeletonElement type="middle__text" />
        <SkeletonElement type="small__text" />
      </MyInfoGroup>
    </InfoGroup>
    <SubMenuGroup>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
      <SkeletonElement type="big__text">
        <Shimmer />
      </SkeletonElement>
    </SubMenuGroup>
  </SkeletonPannel>
);

export default SkeletonMypagePannel;

const InfoGroup = styled.div`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid ${({ theme }) => theme.color_gray_10};
`;

const MyInfoGroup = styled.div`
  width: calc(100% - 78px);
  margin-left: 10px;

  div {
    width: 100%;

    &:first-child {
      width: 50%;
    }
  }
`;

const SubMenuGroup = styled.div`
  margin-top: 30px;

  div {
    width: 100%;
    margin-top: 15px;
  }
`;
