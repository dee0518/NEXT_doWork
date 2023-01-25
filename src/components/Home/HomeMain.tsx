import ContentInner from 'components/Common/ContentInner';
import LinkBtn from 'components/Common/LinkBtn';
import BlindTitle from 'components/Common/BlindTitle';
import ProcessSection from 'components/Home/ProcessSection';
import VisualSvg from 'components/Home/VisualSvg';
import styled from 'styled-components';
import { mediaQuery1024, mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import { LOGIN, MAIN } from 'constants/navigation';
import { useSession } from 'next-auth/react';
import ContactSection from './ContactSection';

const HomeMain = () => {
  const { data: session } = useSession();

  return (
    <Main>
      <Visual>
        <BlindTitle>Visual</BlindTitle>
        <VisualInner>
          <VisualImageGroup>
            <VisualSvg />
          </VisualImageGroup>
          <MainTextGroup>
            <p>
              <Span>doWork</Span>
              <Span>Enojoy working together.</Span>
            </p>
            <LoginLink href={session ? MAIN : LOGIN}>{session ? 'go main' : 'start doWork'}</LoginLink>
          </MainTextGroup>
        </VisualInner>
      </Visual>
      <ProcessSection />
      <ContactSection />
    </Main>
  );
};

export default HomeMain;

const Main = styled.main`
  padding-top: 70px;
`;

const Visual = styled.section`
  padding: 50px 0 130px;

  ${mediaQuery1024} {
    padding: 80px 0 130px;
  }
`;

const VisualInner = styled(ContentInner)`
  ${mediaQuery1024} {
    ${flexbox('row-reverse', 'nowrap', 'space-between', 'center')}
  }
`;

const VisualImageGroup = styled.div`
  margin-bottom: 10px;
  text-align: right;

  ${mediaQuery1024} {
    width: 50%;
    margin-bottom: 0px;
  }
`;

const MainTextGroup = styled.div`
  ${mediaQuery1024} {
    padding-top: 160px;
  }
`;

const Span = styled.span`
  display: block;
  font-size: 4.8rem;
  font-weight: bold;

  &:last-child {
    font-size: 1.8rem;
    font-weight: normal;
    color: ${({ theme }) => theme.color_gray_70};
  }

  ${mediaQuery768} {
    font-size: 8rem;

    &:last-child {
      font-size: 3.2rem;
    }
  }
`;

const LoginLink = styled(LinkBtn)`
  width: 150px;
  margin-top: 50px;
  line-height: 45px;

  ${mediaQuery768} {
    margin-top: 80px;
  }
`;
