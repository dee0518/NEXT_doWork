import InputForm from 'components/Common/InputForm';
import Title from 'components/Common/Title';
import Wrapper from 'components/Common/Wrapper';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

type TProps = {
  title: string;
  subTitle: string;
  guide: string[];
};

const Confirm = ({ title, subTitle, guide }: TProps) => (
  <>
    <Title>{title}</Title>
    <AccountWrapper>
      <div>
        <H3>{subTitle}</H3>
        <Guide>
          {guide.map(text => (
            <span key={text}>{text}</span>
          ))}
        </Guide>
      </div>
      <InputForm
        input={{
          id: 'accountPw',
          type: 'password',
          placeholder: '비밀번호를 입력해주세요',
        }}
        label={{ htmlFor: 'accountPw', className: 'blind', children: '비밀번호' }}
      />
    </AccountWrapper>
  </>
);

export default Confirm;

const AccountWrapper = styled(Wrapper)`
  padding: 30px;
  margin-bottom: 20px;
  ${flexbox('row', 'nowrap', 'space-between', 'flex-end')}

  input {
    width: 500px;
  }
`;

const H3 = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const Guide = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color_gray_60};

  span {
    display: block;
  }
`;
