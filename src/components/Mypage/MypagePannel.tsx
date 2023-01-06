import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useReduxSelector } from 'hooks/useRedux';
import SubPannel from 'components/Common/SubPannel';
import Profile from 'components/Common/Profile';
import Loading from 'components/Common/Loading';
import styled from 'styled-components';
import { buttonNone, flexbox } from 'styles/mixin';
import { LOGIN, MYPAGE } from 'constants/navigation';
import { iUserInfo } from 'types/auth';

const MypagePannel = () => {
  const { user } = useReduxSelector(state => state.auth);
  const { name, career, profile } = user as iUserInfo;
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const isExisting = localStorage.getItem('doWork_theme');
    const curTheme: boolean = isExisting ? JSON.parse(isExisting) : true;
    setIsDarkTheme(curTheme);
  }, []);

  const onLogout = () => {
    setIsLoading(true);
    signOut({
      callbackUrl: LOGIN,
    });
  };

  const onToggleTheme = () => {
    localStorage.setItem('doWork_theme', (!isDarkTheme).toString());
    setIsDarkTheme(prev => !prev);
  };

  return (
    <>
      {isLoading && <Loading />}
      <SubPannel title="My page">
        <UserInfoGroup>
          <Profile src={profile} width={68} height={68} />
          <UserInfo>
            <span>{name}</span>
            <span>{career}</span>
          </UserInfo>
        </UserInfoGroup>
        <ul>
          <MenuItem>
            <Link href={MYPAGE}>setting</Link>
          </MenuItem>
          <MenuItem>
            <button type="button" onClick={onLogout}>
              logout
            </button>
          </MenuItem>
          <MenuItem>
            <button type="button" className={isDarkTheme ? 'on' : ''} onClick={onToggleTheme}>
              darkmode
            </button>
          </MenuItem>
        </ul>
      </SubPannel>
    </>
  );
};

export default MypagePannel;

const UserInfoGroup = styled.div`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_10};
`;

const UserInfo = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color_gray_100};

  span {
    display: block;

    &:first-child {
      font-weight: bold;
      font-size: 1.8rem;
    }
  }
`;

const MenuItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_10};

  &:last-child {
    border-bottom: 0;

    button {
      position: relative;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }

      &::before {
        right: 5px;
        width: 40px;
        height: 24px;
        border-radius: 12px;
        background: ${({ theme }) => theme.color_gray_40};
        transition: background 0.3s ease;
      }

      &::after {
        right: 21px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: ${({ theme }) => theme.white};
        box-shadow: ${({ theme }) => theme.box_shadow_gray_1};
        transition: right 0.3s ease;
      }

      &.on::before {
        background: ${({ theme }) => theme.point_orange};
      }

      &.on::after {
        right: 6px;
      }
    }
  }

  a,
  button {
    display: block;
    width: 100%;
    padding: 25px 5px;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color_gray_100};
    text-transform: capitalize;
  }

  button {
    ${buttonNone}
    text-align: left;
  }
`;
