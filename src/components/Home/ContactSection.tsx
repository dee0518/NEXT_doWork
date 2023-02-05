import { ChangeEvent, useState } from 'react';
import Button from 'components/Common/Button';
import ContentInner from 'components/Common/ContentInner';
import ContentDesc from 'components/Common/ContentDesc';
import Title from 'components/Common/Title';
import InputForm from 'components/Common/InputForm';
import Wrapper from 'components/Common/Wrapper';
import ContactSvg from 'components/Home/ContactSvg';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';

const ContactSection = () => {
  const [contact, setContact] = useState({
    email: '',
    title: '',
    content: '',
  });

  const onChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    setContact(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    alert('아직 메일 보내는 기능이 연결되지 않았습니다.');
    setContact({
      email: '',
      title: '',
      content: '',
    });
  };

  return (
    <Container className="clear">
      <ContentInner>
        <Title className="home__title">Contact Us</Title>
        <Desc>
          <span>doWork의 발전을 위해 여러분의 의견을 들려주세요! </span>
          <span>궁금한 점도 언제든지 환영이에요:&#41;</span>
        </Desc>
        <MailWrapper>
          {/* <InputForm
            id="email"
            name="email"
            type="text"
            title="이메일"
            placeholder="회신받을 메일 주소를 입력해주세요."
            labelClass="blind"
            value={contact.email}
            onChange={onChange}
          /> */}
          <InputForm
            id="title"
            name="title"
            type="text"
            title="제목"
            placeholder="제목을 입력해주세요."
            labelClass="blind"
            value={contact.title}
            onChange={onChange}
          />
          <Textarea
            name="content"
            value={contact.content}
            placeholder="여러분의 의견을 들려주세요."
            onChange={onChange}
          />
          <Button onClick={onSubmit}>전송</Button>
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

const Desc = styled(ContentDesc)`
  ${mediaQuery768} {
    float: left;
    width: calc(50% - 15px);
  }
`;

const MailWrapper = styled(Wrapper)`
  margin-top: 30px;
  padding: 30px 20px;

  & > div {
    margin-bottom: 15px;
  }

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
  margin: 0 0 30px;
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
