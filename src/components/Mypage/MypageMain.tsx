import { useReduxSelector } from 'hooks/useRedux';
import ServiceMain from 'components/Common/ServiceMain';
import Profile from 'components/Common/Profile';
import MembershipCard from 'components/Mypage/MembershipCard';
import Settings from 'components/Mypage/Settings';
import styled from 'styled-components';
import { iUserInfo } from 'types/auth';

const MypageMain = () => {
  const { user } = useReduxSelector(state => state.auth);
  const { email, name, career, profile, introduce } = user as iUserInfo;

  return (
    <ServiceMain>
      <MembershipCard>
        <TextContents>
          <BoldSpan>
            안녕하세요 <br /> 저는 {name}입니다.
          </BoldSpan>
          <Introduce>{introduce}</Introduce>
          <Email>{email}</Email>
          <Career>{career || 'doWorker'}</Career>
        </TextContents>
        <Profile src={profile} width={200} height={200} />
      </MembershipCard>
      <Settings />
    </ServiceMain>
  );
};

export default MypageMain;

const TextContents = styled.p`
  width: 70%;
  padding-bottom: 80px;
  font-size: 1.5rem;
  line-height: 1.3;
  color: ${({ theme }) => theme.color_gray_100};

  span {
    display: block;
  }
`;

const BoldSpan = styled.span`
  font-weight: bold;
  font-size: 1.8rem;
  margin-bottom: 5px;
`;

const Introduce = styled.span`
  width: 60%;
`;

const Email = styled.span`
  position: absolute;
  left: 25px;
  bottom: 54px;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.color_gray_40};
`;

const Career = styled(BoldSpan)`
  position: absolute;
  left: 25px;
  bottom: 16px;
  font-size: 2.4rem;
`;
