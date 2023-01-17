import { useReduxSelector } from 'hooks/useRedux';
import InputForm from 'components/Common/InputForm';
import Title from 'components/Common/Title';
import Wrapper from 'components/Common/Wrapper';
import { ChangeEvent, memo } from 'react';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import Guide from './Guide';

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
        <Guide subTitle={subTitle} guide={guide} />
        {!(isEdit || user.provider) && (
          <InputForm
            id="accountPw"
            type="password"
            title="비밀번호"
            value={pwValue}
            className={error ? 'error' : ''}
            placeholder="비밀번호를 입력해주세요."
            onChange={onChange}
            labelClass="blind"
          />
        )}
        {(isEdit || user.provider) && <Emoji aria-hidden="true">:&#41;</Emoji>}
      </AccountWrapper>
    </>
  );
};

export default memo(Confirm);

const AccountWrapper = styled(Wrapper)`
  padding: 30px;
  ${flexbox('row', 'nowrap', 'space-between', 'flex-end')}
  gap: 15px;

  input {
    min-width: 350px;
    max-width: 500px;
  }
`;

const Emoji = styled.span`
  font-size: 5rem;
  color: ${({ theme }) => theme.color_gray_20};
`;
