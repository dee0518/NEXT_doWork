import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import logo from 'images/common/logo.svg';
import { HOME } from 'constants/navigation';

const Logo = () => {
  return (
    <H1>
      <LogoLink href={HOME}>
        <LogoImage src={logo} alt="do work" />
        <Title aria-hidden="true">doWork</Title>
      </LogoLink>
    </H1>
  );
};

export default Logo;

const H1 = styled.h1`
  margin-bottom: 5px;

  ${mediaQuery768} {
    margin-bottom: 15px;
  }
`;

const LogoLink = styled(Link)`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 10px;

  ${mediaQuery768} {
    gap: 15px;
  }
`;

const LogoImage = styled(Image)`
  width: 28px;
  height: auto;

  ${mediaQuery768} {
    width: 32px;
  }
`;

const Title = styled.span`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.white};

  ${mediaQuery768} {
    font-size: 3.6rem;
  }
`;
