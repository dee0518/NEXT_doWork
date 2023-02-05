import ContentInner from 'components/Common/ContentInner';
import DocsNav from 'components/Docs/DocsNav';
import DocsContent from 'components/Docs/DocsContent';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';

const DocsMain = () => {
  return (
    <DocsWrap>
      <DocsInner>
        <DocsNav />
        <DocsContent />
      </DocsInner>
    </DocsWrap>
  );
};

export default DocsMain;

const DocsWrap = styled.main`
  padding: 70px 0 50px;

  ${mediaQuery768} {
    padding: 60px 0 50px;
  }
`;

const DocsInner = styled(ContentInner)`
  ${mediaQuery768} {
    ${flexbox('row', 'nowrap', 'space-between', 'flex-start')}
    gap: 30px;
  }
`;
