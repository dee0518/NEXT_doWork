import styled, { CSSProperties } from 'styled-components';

type TSkeletonType =
  | 'pannel__title'
  | 'content__title'
  | 'big__text'
  | 'middle__text'
  | 'small__text'
  | 'big__avatar'
  | 'middle__avatar'
  | 'small__avatar'
  | 'small__calendar'
  | 'input';

const skeletonType = {
  pannel__title: `
    width: 150px;
    height: 36px;
  `,
  content__title: `
    width: 150px;
    height: 28px;
  `,
  big__text: `
  width: 180px;
  height: 24px;
  `,
  middle__text: `
    width: 180px;
    height: 21px;
  `,
  small__text: `
  width: 260px;
  height: 16px;
  `,
  big__avatar: `
    width: 250px;
    height: 250px;
    border-radius: 50%;
  `,
  middle__avatar: `
    width: 68px;
    height:68px;
    border-radius: 50%;
  `,
  small__avatar: `
    width: 30px;
    height:30px;
    border-radius: 50%;
  `,
  small__calendar: `
  width: 290px;
    height:290px;
    border-radius: 10px;
  `,
  input: `
    width: 100%;
    height: 50px;
  `,
};

const SkeletonElement = styled.div<
  CSSProperties & {
    type: TSkeletonType;
  }
>`
  overflow: hidden;
  position: relative;
  background: #eee;
  width: 100%;
  margin: 10px 0;
  border-radius: 4px;

  ${({ type }) => type && skeletonType[type]};
`;

export default SkeletonElement;
