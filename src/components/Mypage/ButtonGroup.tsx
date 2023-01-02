import Button from 'components/Common/Button';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

type TProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

const ButtonGroup = ({ onCancel, onConfirm }: TProps) => (
  <ButtonWrapper>
    <Button type="button" category="cancel" onClick={onCancel}>
      취소
    </Button>
    <Button type="button" category="primary" onClick={onConfirm}>
      확인
    </Button>
  </ButtonWrapper>
);

export default ButtonGroup;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  ${flexbox('row', 'nowrap', 'flex-end', 'center')}
  gap:10px;

  button {
    width: 180px;
  }
`;
