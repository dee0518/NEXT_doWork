import Button from 'components/Common/Button';
import ContentInner from 'components/Common/ContentInner';
import HomeDesc from 'components/Common/HomeDesc';
import HomeTitle from 'components/Common/HomeTitle';
import InputForm from 'components/Common/InputForm';
import Wrapper from 'components/Common/Wrapper';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import ContactSvg from './ContactSvg';

const ContactSection = () => {
  return (
    <Container className="clear">
      <ContentInner>
        <HomeTitle>Contact Us</HomeTitle>
        <Desc>
          <span>doWork의 발전을 위해 여러분의 의견을 들려주세요! </span>
          <span>궁금한 점도 언제든지 환영이에요:&#41;</span>
        </Desc>
        <MailWrapper>
          <InputForm id="title" type="text" title="제목" placeholder="제목을 입력해주세요." labelClass="blind" />
          <Textarea placeholder="내용을 입력해주세요." />
          <Button>전송</Button>
        </MailWrapper>
        <SvgWrapper>
          <ContactSvg />
        </SvgWrapper>
      </ContentInner>
    </Container>
  );
};

export default ContactSection;

const Container = styled.section`
  padding: 60px 0;

  ${mediaQuery768} {
    padding: 100px 0;
  }
`;

const Desc = styled(HomeDesc)`
  ${mediaQuery768} {
    float: left;
    width: calc(50% - 15px);
  }
`;

const MailWrapper = styled(Wrapper)`
  margin-top: 30px;
  padding: 30px 20px;

  ${mediaQuery768} {
    float: right;
    width: 50%;
    margin-top: 0;
    padding: 50px 25px 35px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 15px;
  margin: 15px 0 30px;
  border: 0;
  border-radius: 6px;
  font-size: 1.4rem;
  line-height: 1.3;
  background: ${({ theme }) => theme.color_gray_10};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.color_gray_50};
  }
`;

const SvgWrapper = styled.div`
  display: none;

  ${mediaQuery768} {
    float: left;
    display: block;
    width: calc(50% - 90px);
    margin-top: 70px;
  }
`;
