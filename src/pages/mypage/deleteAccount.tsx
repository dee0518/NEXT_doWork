import Button from 'components/Common/Button';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import ServiceMain from 'components/Common/ServiceMain';
import Confirm from 'components/Mypage/Confirm';
import MypagePannel from 'components/Mypage/MypagePannel';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

const DeleteAccount = () => (
  <>
    <GlobalNavBar />
    <MypagePannel />
    <ServiceMain>
      <Confirm
        title="Delete Account"
        subTitle="마지막 doWork"
        guide={['아직 doWork와의 즐거움을 차지 못했군요ㅠ.ㅠ', '떠나면 더 이상 같이 일할 수 없어요. 떠나실 건가요?']}
      />
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

export default DeleteAccount;

const ButtonGroup = styled.div`
  ${flexbox('row', 'nowrap', 'flex-end', 'center')}
  gap:10px;

  button {
    width: 180px;
  }
`;
