type TProps = {
  id: string;
  optionList: string[];
  [key: string]: any;
};

const SelectBox = ({ optionList, ...selectProps }: TProps) => (
  <select className="select__box" {...selectProps}>
    {optionList.map((item, i) => (
      <option key={item} value={item.toLowerCase()}>
        {item}
      </option>
    ))}
  </select>
);

export default SelectBox;
