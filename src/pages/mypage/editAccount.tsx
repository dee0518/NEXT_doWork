import Image from 'next/image';
import Button from 'components/Common/Button';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import InputForm from 'components/Common/InputForm';
import ServiceMain from 'components/Common/ServiceMain';
import Confirm from 'components/Mypage/Confirm';
import MembershipCard from 'components/Mypage/MembershipCard';
import MypagePannel from 'components/Mypage/MypagePannel';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import defaultProfile from 'images/mypage/profile.svg';

const EditAccount = () => (
  <>
    <GlobalNavBar />
    <MypagePannel />
    <ServiceMain>
      <Confirm
        title="Edit Account"
        subTitle="나는 어떤 사람인가요?"
        guide={['같이 일하는 사람들에게 나를 소개해주세요.', '새로운 정보를 업데이트해주세요.']}
      />
      <MembershipCard>
        <InfoGroup>
          <Greeting>
            <span>안녕하세요</span>
            <span>저는 황도은입니다.</span>
          </Greeting>
          <InputForm
            input={{ id: 'name', type: 'text', placeholder: '이름을 입력해주세요.' }}
            label={{ htmlFor: 'name', children: 'name' }}
          />
          <InputForm
            input={{ id: 'career', type: 'text', placeholder: '직업을 입력해주세요.' }}
            label={{ htmlFor: 'career', children: 'career' }}
          />
          <div>
            <label htmlFor="introduce">introduce</label>
            <textarea id="introduce" placeholder="나를 소개해주세요:)" />
          </div>
        </InfoGroup>
        <FileGroup>
          <InputForm
            input={{ id: 'profile', type: 'file' }}
            label={{ htmlFor: 'profile', labelClass: 'blind', children: 'profile' }}
          />
          <Profile src={defaultProfile} alt="profile" />
          <Email>
            <span>email</span>
            <span>adfjkl@dsfjlk.com</span>
          </Email>
        </FileGroup>
      </MembershipCard>
      <ButtonGroup>
        <Button type="button" category="cancel">
          취소
        </Button>
        <Button type="button" category="primary">
          확인
        </Button>
      </ButtonGroup>
    </ServiceMain>
  </>
);

export default EditAccount;

const ButtonGroup = styled.div`
  ${flexbox('row', 'nowrap', 'flex-end', 'center')}
  gap:10px;

  button {
    width: 180px;
  }
`;

const InfoGroup = styled.div`
  width: 60%;

  .input__form {
    margin-bottom: 25px;
  }

  label {
    display: block;
    font-size: 1.3rem;
    margin-bottom: 8px;
    text-transform: capitalize;
  }

  input {
    width: 100%;
  }

  textarea {
    width: 100%;
    padding: 13px;
    border: 0;
    border-radius: 6px;
    font-size: 1.3rem;
    line-height: 1.3;
    background: ${({ theme }) => theme.color_gray_10};
    resize: none;
  }
`;

const Greeting = styled.p`
  margin-bottom: 50px;
  font-size: 2rem;
  line-height: 1.3;
  font-weight: bold;

  span {
    display: block;
  }
`;

const FileGroup = styled.div`
  ${flexbox('column', 'nowrap', 'flex-end', 'flex-start')}
  position: relative;
  padding: 30px;

  input {
    display: none;
  }

  label {
    position: absolute;
    left: 50%;
    top: 230px;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color_purple_50} url(/images/mypage/camera.svg) no-repeat;
    background-position: center;
    text-indent: -9999px;
    transform: translate3d(60px, 0, 0);
    overflow: hidden;
  }
`;

const Profile = styled(Image)`
  width: 250px;
  height: 250px;
`;

const Email = styled.p`
  margin-top: 24px;
  font-size: 1.5rem;
  line-height: 1.3;

  span {
    display: block;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.color_gray_70};

    &:first-child {
      margin-bottom: 8px;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.color_gray_100};
      text-transform: capitalize;
    }
  }
`;
