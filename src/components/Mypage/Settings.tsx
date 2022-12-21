import Title from 'components/Common/Title';
import Wrapper from 'components/Common/Wrapper';
import { DELETEACCOUNT, EDITACCOUNT } from 'constants/navigation';
import Link from 'next/link';
import styled from 'styled-components';

const SettingList = [
  {
    id: 'edit',
    title: 'Edit Account',
    link: EDITACCOUNT,
    content: '나를 소개하는 정보를 수정할 수 있어요',
  },
  {
    id: 'delete',
    title: 'Delete Account',
    link: DELETEACCOUNT,
    content: '같이 일하시는 게 어려우면 계정을 삭제해주세요',
  },
];

const Settings = () => (
  <Section>
    <Title>Settings</Title>
    <Wrapper>
      <ul>
        {SettingList.map(({ id, title, link, content }) => (
          <SettingItem key={id}>
            <Link href={link}>
              <ItemTitle>{title}</ItemTitle>
              <ItemContent>{content}</ItemContent>
            </Link>
          </SettingItem>
        ))}
      </ul>
    </Wrapper>
  </Section>
);

export default Settings;

const Section = styled.section`
  margin-top: 50px;
`;

const SettingItem = styled.li`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 25px;
    bottom: 0;
    width: calc(100% - 50px);
    height: 1px;
    background: ${({ theme }) => theme.color_gray_10};
  }

  &:last-child::after {
    content: none;
  }

  a {
    display: block;
    width: 100%;
    padding: 50px 30px;
    font-size: 1.6rem;
  }
`;

const ItemTitle = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color_gray_100};
`;

const ItemContent = styled.span`
  display: block;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color_gray_50};
`;
