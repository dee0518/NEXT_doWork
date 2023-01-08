import Link from 'next/link';
import ContentInner from 'components/Common/ContentInner';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <HomeFooter>
      <Inner>
        <Copyright>&copy; {year} doWork.</Copyright>
        <SnsList>
          <li>
            <VelogLink
              href="https://velog.io/@dee0518/Memoir-%ED%95%A8%EA%BB%98-%EC%9D%BC%ED%95%B4%EC%9A%94-doWork-t8otrvg1"
              passHref
              target="_blank"
              rel="noreferrer"
              aria-label="velog doWork 회고록"
            />
          </li>
          <li>
            <GithubLink
              href="https://github.com/dee0518/NEXT_doWork"
              passHref
              target="_blank"
              rel="noreferrer"
              aria-label="github NEXT_doWork repository"
            />
          </li>
        </SnsList>
      </Inner>
    </HomeFooter>
  );
};

export default Footer;

const HomeFooter = styled.footer`
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.color_gray_10};

  ${mediaQuery768} {
    padding: 30px 0;
  }
`;

const Inner = styled(ContentInner)`
  ${flexbox('row', 'nowrap', 'space-between', 'center')}
`;

const Copyright = styled.p`
  font-size: 1.2rem;
  line-height: 20px;
  color: ${({ theme }) => theme.color_gray_100};

  ${mediaQuery768} {
    font-size: 1.4rem;
    line-height: 24px;
  }
`;

const SnsList = styled.ul`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 15px;
`;

const VelogLink = styled(Link)`
  display: block;
  width: 16px;
  height: 16px;
  background: url(/images/common/velog.svg) no-repeat;
  background-size: 16px 16px;
  background-position: center;

  ${mediaQuery768} {
    width: 24px;
    height: 24px;
    background-size: contain;
  }
`;

const GithubLink = styled(VelogLink)`
  background-image: url(/images/common/github.svg);
`;
