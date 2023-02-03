import { useRouter } from 'next/router';
import GettingStart from 'components/Docs/GettingStart';
import Schedule from 'components/Docs/Schedule';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';

const DocsContent = () => {
  const router = useRouter();
  const { docsId } = router.query;

  return (
    <Wrapper>
      {docsId === 'gettingStart' && <GettingStart />}
      {docsId === 'schedule' && <Schedule />}
    </Wrapper>
  );
};

export default DocsContent;

const Wrapper = styled.section`
  padding-top: 30px;

  ${mediaQuery768} {
    padding-top: 70px;
    flex-basis: calc(100% - 250px);
  }
`;
