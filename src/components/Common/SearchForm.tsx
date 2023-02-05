import { FormEvent, ChangeEvent, memo } from 'react';
import InputForm from 'components/Common/InputForm';
import styled from 'styled-components';

type TProps = {
  title: string;
  value: string;
  placeholder: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchForm = ({ title, value, placeholder, onSubmit, onChange }: TProps) => {
  return (
    <Form onSubmit={onSubmit} className="search__form">
      <InputForm
        id="search"
        type="text"
        title={title}
        name="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        labelClass="blind"
      />
    </Form>
  );
};

export default memo(SearchForm);

const Form = styled.form`
  input {
    padding: 15px;
    border-radius: 6px;
  }
`;
