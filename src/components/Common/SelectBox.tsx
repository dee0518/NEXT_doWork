type EventHandler = (e: any) => void;
type TProps = {
  id: string;
  optionList: string[];
  [key: string]: string | string[] | EventHandler;
};

const SelectBox = ({ optionList, ...selectProps }: TProps) => (
  <select className="select__box" {...selectProps}>
    {optionList.map(item => (
      <option key={item} value={item.toLowerCase()}>
        {item}
      </option>
    ))}
  </select>
);

export default SelectBox;
