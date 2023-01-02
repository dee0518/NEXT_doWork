import { useReduxSelector } from 'hooks/useRedux';
import InputForm from 'components/Common/InputForm';
import Title from 'components/Common/Title';
import Wrapper from 'components/Common/Wrapper';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

type TProps = {
  title: string;
  subTitle: string;
  guide: string[];
  error: boolean;
  pwValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isEdit?: boolean;
};

const Confirm = ({ title, subTitle, guide, error, pwValue, onChange, isEdit }: TProps) => {
  const { user } = useReduxSelector(state => state.auth);

  return (
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
        {!(isEdit || user.provider) && (
          <InputForm
            input={{
              id: 'accountPw',
              type: 'password',
              placeholder: '비밀번호를 입력해주세요',
              value: pwValue,
              onChange,
              className: error ? 'error' : '',
            }}
            label={{ htmlFor: 'accountPw', className: 'blind', children: '비밀번호' }}
          />
        )}
        {(isEdit || user.provider) && <Emoji aria-hidden="true">:&#41;</Emoji>}
      </AccountWrapper>
    </>
  );
};

export default Confirm;

const AccountWrapper = styled(Wrapper)`
  padding: 30px;
  ${flexbox('row', 'nowrap', 'space-between', 'flex-end')}
  gap: 15px;

  input {
    min-width: 350px;
    max-width: 500px;
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

const Emoji = styled.span`
  font-size: 5rem;
  color: ${({ theme }) => theme.color_gray_20};
`;
