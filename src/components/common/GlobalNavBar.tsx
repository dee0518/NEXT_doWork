import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import BlindTitle from 'components/Common/BlindTitle';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import { mediaQuery1024 } from 'styles/mediaQuery';
import logo from 'images/common/logo.svg';
import { MAIN, MYPAGE } from 'constants/navigation';

const menuList = [
  {
    id: 'schedule',
    link: MAIN,
  },
  {
    id: 'mypage',
    link: MYPAGE,
  },
];

const GlobalNavBar = () => {
  const router = useRouter();

  return (
    <Header>
      <H1 className="logo">
        <LogoLink href={MAIN}>
          <Image src={logo} alt="do work" />
        </LogoLink>
      </H1>
      <Nav>
        <BlindTitle>Navigataion</BlindTitle>
        <Ul>
          {menuList.map(({ id, link }) => (
            <Li key={id}>
              <NavLink href={link} aria-label={id} className={link === router.pathname ? `${id} activated` : id} />
            </Li>
          ))}
        </Ul>
      </Nav>
    </Header>
  );
};

export default GlobalNavBar;

const Header = styled.header`
  ${flexbox('row', 'nowrap', 'center', 'center')}
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 70px;
  border-radius: 0 70px 0 0;
  ${({ theme }) => `background: linear-gradient(to right, ${theme.color_purple_60}, ${theme.color_purple_40})`};

  ${mediaQuery1024} {
    flex-direction: column;
    top: 0;
    width: 64px;
    height: 100%;
    border-radius: 0 0 40px 0;
    ${({ theme }) => `background: linear-gradient(to bottom, ${theme.color_purple_60}, ${theme.color_purple_40})`};
  }
`;

const H1 = styled.h1`
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  ${mediaQuery1024} {
    left: 50%;
    top: 30px;
    transform: translate3d(-50%, 0, 0);
  }
`;

const LogoLink = styled(Link)`
  display: block;
  width: 36px;
  height: 36px;

  img {
    width: 100%;
    height: 100%;
  }

  ${mediaQuery1024} {
    width: 50px;
    height: 50px;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  ${flexbox('row', 'nowrap', 'center', 'center')}
  gap: 10px;

  ${mediaQuery1024} {
    flex-direction: column;
  }
`;

const Li = styled.li`
  width: 64px;
  height: 100%;

  ${mediaQuery1024} {
    width: 100%;
    height: 64px;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    background: url(images/common/menu/schedule_off.svg) no-repeat;
    background-position: center;
  }

  &.mypage::before {
    background-image: url(images/common/menu/mypage_off.svg);
  }

  &.activated::after {
    content: '';
    position: absolute;
    top: -41px;
    right: -2px;
    display: block;
    width: 70px;
    height: 150px;
    background: url(images/common/menu/menu_bg.svg) no-repeat;
    background-size: contain;
    background-position: right center;
    transform: rotate(-90deg);
  }

  &.activated::before {
    background-image: url(images/common/menu/schedule_on.svg);
  }

  &.mypage.activated::before {
    background-image: url(images/common/menu/mypage_on.svg);
  }

  ${mediaQuery1024} {
    &.activated::after {
      top: -18px;
      right: -1px;
      width: 95%;
      height: 100px;
      transform: none;
    }
  }
`;
