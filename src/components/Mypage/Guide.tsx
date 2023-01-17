import { memo } from 'react';
import styled from 'styled-components';

type TProps = {
  subTitle: string;
  guide: string[];
};

const Guide = ({ subTitle, guide }: TProps) => {
  return (
    <div>
      <H3>{subTitle}</H3>
      <GuideText>
        {guide.map(text => (
          <span key={text}>{text}</span>
        ))}
      </GuideText>
    </div>
  );
};

export default memo(Guide);

const H3 = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const GuideText = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color_gray_60};

  span {
    display: block;
  }
`;
