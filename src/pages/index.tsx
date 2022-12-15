import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { blind, buttonStyle, flexbox } from 'styles/mixin';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>doWork : 같이 일해 보아요:)</title>
      <meta name="keywords" content="doWork, work, together, 같이, 일, 협업, 동료, 스케쥴, 일정, 관리" />
      <meta name="description" content="일정 관리를 하면서 같이 일해보아요." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header>
      <Inner>
        <h1>
          <Link href="/">
            <Image src="/images/common/logo.svg" width={36} height={36} alt="doWork" />
          </Link>
        </h1>
        <Nav>
          <H2>네비게이션</H2>
          <NavList>
            <li>
              <LinkLogin href="/login">로그인</LinkLogin>
            </li>
          </NavList>
        </Nav>
      </Inner>
    </Header>
    <Main>
      <p>
        <Span>doWork에 오신 걸</Span>
        <Span>환영합니다</Span>
      </p>
    </Main>
  </div>
);

export default Home;

const Header = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.box_shadow_gray};
`;

const Inner = styled.div`
  width: 90%;
  margin: 0 auto;
  ${flexbox('row', 'nowrap', 'space-between', 'center')}

  @media screen and (min-width: 1024px) {
    max-width: 1280px;
  }
`;

const H2 = styled.h2`
  ${blind}
`;

const Nav = styled.nav`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
`;

const NavList = styled.ul`
  ${flexbox('row', 'nowrap')}
  gap: 10px;
`;

const LinkLogin = styled(Link)`
  display: block;
  text-align: center;
  line-height: 43px;
  ${({ theme }) => buttonStyle(theme.white, theme.color_purple_60, theme.color_purple_60)}
`;

const Main = styled.main`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  ${flexbox('column', 'nowrap', 'center', 'center')}
  text-align: center;
  background: ${({ theme }) => theme.color_purple_50};
`;

const Span = styled.span`
  display: block;
  font-size: 8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.white};
`;
