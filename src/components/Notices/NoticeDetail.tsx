import { changeDate } from 'utils/dateUtils';
import ContentInner from 'components/Common/ContentInner';
import Title from 'components/Common/Title';
import Wrapper from 'components/Common/Wrapper';
import LinkBtn from 'components/Common/LinkBtn';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import { NOTICES } from 'constants/navigation';
import { iNotice } from 'types/notices';

type TProps = {
  notice: iNotice;
};

const NoticeDetail = ({ notice }: TProps) => {
  return (
    <NoticesWrap>
      <ContentInner>
        <Title className="home__title">Notices</Title>
        <ContentWrapper>
          <H3>{notice.title}</H3>
          <Content>{notice.content}</Content>
          <CreatedAt>{changeDate(new Date(notice.created_at))}</CreatedAt>
        </ContentWrapper>
        <LinkWrapper>
          <LinkBtn href={NOTICES} type="primary">
            목록으로 이동
          </LinkBtn>
        </LinkWrapper>
      </ContentInner>
    </NoticesWrap>
  );
};

export default NoticeDetail;

const NoticesWrap = styled.main`
  padding: 100px 0 80px;

  ${mediaQuery768} {
    padding: 150px 0;
  }
`;

const ContentWrapper = styled(Wrapper)`
  position: relative;
  margin-top: 20px;

  ${mediaQuery768} {
    margin-top: 30px;
  }
`;

const H3 = styled.h3`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.color_gray_40};
  font-size: 1.6rem;
  font-weight: bold;

  ${mediaQuery768} {
    padding: 20px 25px;
  }
`;

const Content = styled.p`
  padding: 15px;
  min-height: 150px;
  font-size: 1.6rem;

  ${mediaQuery768} {
    padding: 25px;
    min-height: 200px;
  }
`;

const CreatedAt = styled.span`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 1.4rem;

  ${mediaQuery768} {
    right: 25px;
    bottom: 25px;
    font-size: 1.6rem;
  }
`;

const LinkWrapper = styled.div`
  margin-top: 30px;
  ${flexbox('row-reverse', 'nowrap')}

  & a {
    width: 150px;
    font-size: 1.4rem;
  }

  ${mediaQuery768} {
    & a {
      width: 180px;
      font-size: 1.6rem;
    }
  }
`;
