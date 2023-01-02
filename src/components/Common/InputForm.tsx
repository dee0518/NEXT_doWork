import styled from 'styled-components';
import { blind } from 'styles/mixin';

type EventHandler = (e: any) => void;

type TLabelProps = {
  htmlFor: string;
  [key: string]: string;
};

type TInputProps = {
  id: string;
  type: string;
  [key: string]: string | boolean | EventHandler;
};

type TInputFormProps = {
  label: TLabelProps;
  input: TInputProps;
};

const InputForm = ({ label, input }: TInputFormProps) => {
  const { htmlFor, ...labelProps } = label;
  return (
    <div className="input__form">
      <Label htmlFor={htmlFor} {...labelProps} />
      <Input {...input} />
    </div>
  );
};

export default InputForm;

const Input = styled.input`
  width: 100%;
  padding: 13px;
  border: 0;
  border-radius: 6px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color_gray_100};
  background: ${({ theme }) => theme.color_gray_10};

  &::placeholder {
    color: ${({ theme }) => theme.color_gray_50};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.color_gray_100};
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.point_pink};
  }
`;

const Label = styled.label`
  &.blind {
    ${blind}
  }
`;
