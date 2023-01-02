import GlobalNavBar from 'components/Common/GlobalNavBar';
import ServiceMain from 'components/Common/ServiceMain';
import Wrapper from 'components/Common/Wrapper';
import SkeletonElement from 'components/Skeleton/SkeletonElement';
import Shimmer from 'components/Skeleton/Shimmer';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import SkeletonMypagePannel from './SkeletonMypagePannel';

const SkeletonMypageEdit = () => (
  <>
    <GlobalNavBar />
    <SkeletonMypagePannel />
    <ServiceMain>
      <SkeletonElement type="content__title" />
      <EditGroup>
        <div>
          <SkeletonElement type="pannel__title">
            <Shimmer />
          </SkeletonElement>
          <SkeletonElement type="big__text">
            <Shimmer />
          </SkeletonElement>
        </div>
        <SkeletonElement type="pannel__title">
          <Shimmer />
        </SkeletonElement>
      </EditGroup>
    </ServiceMain>
  </>
);

export default SkeletonMypageEdit;

const EditGroup = styled(Wrapper)`
  ${flexbox('row', 'nowrap', 'space-between', 'flex-end')}
  padding: 30px;
  margin-top: 20px;

  div {
    width: 300px;
  }
`;
