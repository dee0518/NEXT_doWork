import ContentInner from 'components/Common/ContentInner';
import ContentDesc from 'components/Common/ContentDesc';
import Title from 'components/Common/Title';
import styled from 'styled-components';
import { mediaQuery1024, mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import BrandEnjoySvg from './BrandEnjoySvg';
import BrandConnectSvg from './BrandConnectSvg';

const BrandSection = () => {
  return (
    <Container>
      <ContentInner>
        <Title className="home__title">Brand Story</Title>
        <ContentDesc>
          <span>일하는 것도 일상 생활! 괴롭기보단 doWorker들이 자부심을 느끼고 즐거움을 느꼈으면 해요</span>
          <span>doWork는 아래의 모토를 가지고 서비스를 운영하려 해요</span>
        </ContentDesc>
        <ConceptGroup>
          <ConceptImgWrapper>
            <BrandEnjoySvg />
          </ConceptImgWrapper>
          <DescGroup className="desc__group">
            <ConceptTitle>
              <span>01</span>
              <span>Enjoy</span>
            </ConceptTitle>
            <ConceptDecs>
              즐기는 사람은 이길 자가 없다! doWork는 doWorker들이 서비스를 이용하면서 일상이라고 할 수 있는 일이 노동이
              아닌 즐거움이라고 생각하도록 기능을 제공하고자 합니다.
            </ConceptDecs>
          </DescGroup>
        </ConceptGroup>
        <ConceptGroup>
          <ConceptImgWrapper>
            <BrandConnectSvg />
          </ConceptImgWrapper>
          <DescGroup className="desc__group">
            <ConceptTitle>
              <span>02</span>
              <span>Connect</span>
            </ConceptTitle>
            <ConceptDecs>
              여러 부서와 협업하는 프로젝트들을 doWork로 간편하게 관리하세요. 협업이 주가 되는 만큼 관련된 툴도 많은
              요즘. 그만큼 확인하고 관리할 게 많죠. doWorker들의 이런 고민들을 해결하기 위해 협업을 위한 다양한 기능들을
              제공하고 있어요.
            </ConceptDecs>
          </DescGroup>
        </ConceptGroup>
      </ContentInner>
    </Container>
  );
};

export default BrandSection;

const Container = styled.section`
  padding: 100px 0;
  background: #f9f9f9;

  ${mediaQuery768} {
    padding: 150px 0;
  }
`;

const ConceptGroup = styled.div`
  position: relative;
  margin-top: 80px;

  &:last-child h3 {
    color: ${({ theme }) => theme.point_pink};
  }

  ${mediaQuery768} {
    gap: 30px;
    ${flexbox('row-reverse', 'nowrap', 'space-between', 'flex-start')};

    &:nth-last-child(2) > div:first-child {
      max-width: 520px;
      margin-top: -80px;
      margin-left: 0;
    }

    &:last-child {
      margin-top: 150px;
      flex-flow: row nowrap;

      & .desc__group {
        width: 58%;
      }
    }
  }

  ${mediaQuery1024} {
    gap: 70px;
    margin-top: 100px;
  }
`;

const ConceptImgWrapper = styled.div`
  width: 50%;
  margin-left: 50%;

  ${mediaQuery768} {
    margin-left: 0;
    max-width: 490px;
    margin-top: -160px;
    margin-left: -30px;
  }
`;

const DescGroup = styled.div`
  ${mediaQuery768} {
    width: 50%;
  }
`;

const ConceptTitle = styled.h3`
  ${flexbox('row', 'nowrap', 'space-between', 'center')};
  margin-top: -50px;
  margin-bottom: 20px;
  font-size: 4rem;
  color: ${({ theme }) => theme.point_orange};

  span:first-child {
    opacity: 0.5;
  }

  ${mediaQuery768} {
    margin-top: 0px;
  }

  ${mediaQuery1024} {
    font-size: 6rem;

    span:first-child {
      font-size: 10rem;
    }
  }
`;

const ConceptDecs = styled.p`
  color: ${({ theme }) => theme.color_gray_90};
  font-size: 1.8rem;
  line-height: 1.3;

  ${mediaQuery1024} {
    font-size: 2.4rem;
  }
`;
