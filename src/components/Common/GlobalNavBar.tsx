import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Title from 'components/Common/Title';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import logo from 'images/common/logo.svg';
import { MAIN, MYPAGE } from 'constants/navigation';

type menuItem = {
  id: string;
  link: string;
};

const menuList: menuItem[] = [
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
        <Title className="blind">Navigataion</Title>
        <Ul>
          {menuList.map(({ id, link }) => (
            <Li key={id}>
              <NavLink
                href={link}
                aria-label={id}
                className={router.pathname.includes(link) ? `${id} activated` : id}
              />
            </Li>
          ))}
        </Ul>
      </Nav>
    </Header>
  );
};

export default GlobalNavBar;

const Header = styled.header`
  ${flexbox('column', 'nowrap', 'center', 'center')}
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 64px;
  height: 100%;
  border-radius: 0 0 40px 0;
  ${({ theme }) => `background: linear-gradient(to bottom, ${theme.linear_gradient_purple})`};
`;

const H1 = styled.h1`
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translate3d(-50%, 0, 0);
`;

const LogoLink = styled(Link)`
  display: block;
  width: 44px;
  height: 44px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  ${flexbox('column', 'nowrap', 'center', 'center')}
  gap: 10px;
`;

const Li = styled.li`
  width: 100%;
  height: 64px;
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
    background: url(/images/common/menu/schedule_off.svg) no-repeat;
    background-position: center;
  }

  &.mypage::before {
    background-image: url(/images/common/menu/mypage_off.svg);
  }

  &.activated::after {
    content: '';
    position: absolute;
    top: -18px;
    right: -1px;
    display: block;
    width: 95%;
    height: 100px;
    background: url(/images/common/menu/menu_bg.svg) no-repeat;
    background-size: contain;
    background-position: right center;
  }

  &.activated::before {
    background-image: url(/images/common/menu/schedule_on.svg);
  }

  &.mypage.activated::before {
    background-image: url(/images/common/menu/mypage_on.svg);
  }
`;
