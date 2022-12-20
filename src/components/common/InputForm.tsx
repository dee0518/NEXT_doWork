import styled from 'styled-components';

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
    <div>
      <label htmlFor={htmlFor} {...labelProps} />
      <Input {...input} />
    </div>
  );
};

export default InputForm;

const Input = styled.input`
  width: 100%;
  padding: 13px;
  border: 0;
  border-radius: 4px;
  background: ${({ theme }) => theme.color_gray_10};

  input::placeholder {
    color: ${({ theme }) => theme.color_gray_80};
  }

  input::-webkit-input-placeholder {
    color: ${({ theme }) => theme.color_gray_80};
  }

  input:-ms-input-placeholder {
    color: ${({ theme }) => theme.color_gray_80};
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.point_pink};
  }
`;
