import Image from 'next/image';
import Link from 'next/link';
import { useState, MouseEvent } from 'react';
import ContentInner from 'components/Common/ContentInner';
import LinkBtn from 'components/Common/LinkBtn';
import BlindTitle from 'components/Common/BlindTitle';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { buttonNone, flexbox } from 'styles/mixin';
import homeLogo from 'images/common/home_logo.svg';
import { HOME, LOGIN, DOCS, CONTACT } from 'constants/navigation';
import { TMenuLinkItem } from 'types/home';
import { useSession } from 'next-auth/react';
import defaultProfile from 'images/mypage/profile.svg';

const linkList: TMenuLinkItem[] = [
  {
    id: 'docs',
    link: DOCS,
  },
  {
    id: 'contact us',
    link: CONTACT,
  },
];

const HomeHeader = () => {
  const { data: session } = useSession();
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  const onClickOpenNav = () => {
    setIsOpenNav(prev => !prev);
  };

  const onOpenSnackBar = (menu: string, e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <Header>
      <Inner>
        <h1>
          <LogoLink href={HOME}>
            <Logo src={homeLogo} alt="doWork" />
          </LogoLink>
        </h1>
        <HamburgerBtn aria-label="모바일 메뉴" type="button" onClick={onClickOpenNav} className={isOpenNav ? 'on' : ''}>
          <HamburgerSpan />
          <HamburgerSpan />
          <HamburgerSpan />
        </HamburgerBtn>
        <Nav className={isOpenNav ? 'on' : ''}>
          <BlindTitle>네비게이션</BlindTitle>
          <NavList>
            {linkList.map(({ id, link }) => (
              <NavItem key={id}>
                <NavLink href={link} onClick={onOpenSnackBar.bind(null, id)}>
                  {id}
                </NavLink>
              </NavItem>
            ))}
            {session ? (
              <NavItem key="profile">
                <MainBtn type="button" aria-label="메인으로 가기">
                  <Profile src={defaultProfile} width={30} height={30} alt="profile" />
                </MainBtn>
              </NavItem>
            ) : (
              <NavItem key="try it out">
                <LinkBtn href={LOGIN} type="secondary" fontSize="1.4rem" lineheight="38px">
                  Try it out
                </LinkBtn>
              </NavItem>
            )}
          </NavList>
        </Nav>
      </Inner>
    </Header>
  );
};

export default HomeHeader;

const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 3;
  min-width: 360px;
  width: 100%;
  padding: 15px 0;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.box_shadow_gray_2};
`;

const Inner = styled(ContentInner)`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
`;

const LogoLink = styled(Link)`
  display: block;
  margin: 8px 0;
  height: 24px;
`;

const Logo = styled(Image)`
  width: auto;
  height: 100%;
`;

const HamburgerBtn = styled.button`
  ${buttonNone}
  width: 40px;
  height: 40px;
  margin-right: -10px;

  &.on {
    span:first-child {
      transform: translate3d(0, 8px, 0) rotate(45deg);
    }

    span:nth-child(2) {
      transform: rotate(45deg);
    }

    span:last-child {
      transform: translate3d(0, -8px, 0) rotate(-45deg);
    }
  }

  ${mediaQuery768} {
    display: none;
  }
`;

const HamburgerSpan = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  margin: 0 auto;
  background: ${({ theme }) => theme.color_gray_70};
  transition: transform 0.3s ease;

  &:nth-child(2) {
    margin: 6px auto;
  }
`;

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 70px;
  overflow: hidden;
  width: 100%;
  height: 0;
  border-top: 1px solid ${({ theme }) => theme.color_gray_10};
  background: ${({ theme }) => theme.white};
  transition: height 0.3s ease;

  &.on {
    display: block;
    height: 192px;
    box-shadow: 0 5px 5px 0 ${({ theme }) => theme.black_transparent_15};
  }

  ${mediaQuery768} {
    position: static;
    width: auto;
    height: auto;
    overflow: auto;
    padding: 0;
    border-top: none;
    background: transparent;

    &.on {
      height: auto;
      box-shadow: none;
    }

    ${flexbox('row', 'nowrap', 'normal', 'center')}
  }
`;

const NavList = styled.ul`
  padding: 15px 5% 25px;

  ${mediaQuery768} {
    padding: 0;
    ${flexbox('row', 'nowrap')}
    gap: 20px;
  }
`;

const NavItem = styled.li`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }

  ${mediaQuery768} {
    margin-bottom: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0 4px;
  color: ${({ theme }) => theme.color_gray_100};
  font-size: 1.6rem;
  line-height: 40px;
  text-transform: capitalize;
`;

const Profile = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

const MainBtn = styled.button`
  height: 40px;
  ${flexbox('row', 'nowrap', 'center', 'center')}
  ${buttonNone}
`;
