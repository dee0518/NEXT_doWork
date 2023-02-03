import Title from 'components/Common/Title';
import { DOCS, DOCSSCHEDULE } from 'constants/navigation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';

const DocsNavList = [
  {
    path: DOCS,
    name: 'Getting Start',
  },
  {
    path: DOCSSCHEDULE,
    name: 'Schedule',
  },
];

const DocsNav = () => {
  const router = useRouter();
  const { docsId } = router.query;

  return (
    <Nav>
      <Title>
        Docs <span className="blind">Navigation</span>
      </Title>
      <NavList>
        {DocsNavList.map(({ path, name }) => (
          <NavItem key={path} className={path === `/docs/${docsId}` ? 'on' : ''}>
            <Link href={path}>{name}</Link>
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

export default DocsNav;

const Nav = styled.nav`
  display: none;
  position: fixed;
  left: 0;
  top: 70px;
  width: 100%;
  padding: 20px 5%;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.box_shadow_gray_1};

  ${mediaQuery768} {
    display: block;
    position: sticky;
    left: 0;
    top: 100px;
    width: 220px;
    margin-top: 70px;
    padding: 20px 0;
    border-right: 1px solid ${({ theme }) => theme.color_gray_20};
    background: transparent;
    box-shadow: none;
    bor
  }
`;

const NavList = styled.ul`
  ${flexbox('column', 'nowrap', 'normal', 'flex-start')}
  gap: 2px;
  margin-top: 30px;
`;

const NavItem = styled.li`
  font-size: 1.6rem;

  &.on {
    color: ${({ theme }) => theme.point_orange};
    font-weight: bold;
  }

  a {
    display: block;
    padding: 9px 0;
  }
`;
