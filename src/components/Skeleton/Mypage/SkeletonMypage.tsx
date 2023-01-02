import GlobalNavBar from 'components/Common/GlobalNavBar';
import ServiceMain from 'components/Common/ServiceMain';
import Wrapper from 'components/Common/Wrapper';
import SkeletonElement from 'components/Skeleton/SkeletonElement';
import SkeletonMypagePannel from 'components/Skeleton/Mypage/SkeletonMypagePannel';
import Shimmer from 'components/Skeleton/Shimmer';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

const SkeletonMypage = () => (
  <>
    <GlobalNavBar />
    <SkeletonMypagePannel />
    <ServiceMain>
      <MembershipGroup>
        <MembershipHeader />
        <MembershipContent>
          <SkeletonElement type="pannel__title">
            <Shimmer />
          </SkeletonElement>
          <SkeletonElement type="big__text">
            <Shimmer />
          </SkeletonElement>
          <SkeletonElement type="pannel__title">
            <Shimmer />
          </SkeletonElement>
        </MembershipContent>
        <SkeletonElement type="big__avatar">
          <Shimmer />
        </SkeletonElement>
      </MembershipGroup>
      <SkeletonElement type="content__title" />
      <SettingGroup>
        <SettingItem>
          <SkeletonElement type="pannel__title">
            <Shimmer />
          </SkeletonElement>
          <SkeletonElement type="big__text">
            <Shimmer />
          </SkeletonElement>
        </SettingItem>
        <SettingItem>
          <SkeletonElement type="pannel__title">
            <Shimmer />
          </SkeletonElement>
          <SkeletonElement type="big__text">
            <Shimmer />
          </SkeletonElement>
        </SettingItem>
        <SettingItem>
          <SkeletonElement type="pannel__title">
            <Shimmer />
          </SkeletonElement>
          <SkeletonElement type="big__text">
            <Shimmer />
          </SkeletonElement>
        </SettingItem>
      </SettingGroup>
    </ServiceMain>
  </>
);

export default SkeletonMypage;

const MembershipGroup = styled(Wrapper)`
  position: relative;
  ${flexbox('row', 'nowrap', 'space-between', 'flex-start')}
  padding: 70px 30px 30px;
  margin-bottom: 60px;
`;

const MembershipHeader = styled.div`
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  border-radius: 15px 15px 0 0;
  background-color: #eee;
`;

const MembershipContent = styled.div`
  div {
    width: 300px;
  }

  div:last-child {
    position: absolute;
    left: 30px;
    bottom: 30px;
  }
`;

const SettingGroup = styled(Wrapper)`
  margin-top: 15px;
  padding: 0 30px;
`;

const SettingItem = styled.div`
  padding: 30px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_10};

  div {
    width: 300px;
  }
`;
