import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { poppins } from "~/assets/fonts/fonts";
import { Container, Input } from "./styles";
import { useIsValueInInput } from "~/utils/functions/isValueInInput";
import { useGetInputValueAtIndex } from "~/utils/functions/getInputValueAtIndex";
import { useGetLastRowIndex } from "~/utils/functions/getLastRowIndex";
import { selectedItemIndexAtom } from "~/@atom/ProjectStates/selectedItemIndexAtom";

interface SelectInputProps {
  onChange?: (value: string) => void;
  setIsSelectOpen?: () => void;
  row: string;
}

export default function SelectInput({
  onChange,
  setIsSelectOpen,
  row,
  ...rest
}: SelectInputProps) {
  const [checked] = useAtom(checkedAtom);
  const lastRowIndex = useGetLastRowIndex();
  const isLastRow = row === lastRowIndex;
  const isValueInFirstInput = useIsValueInInput(row, "firstTextValue");
  const firstInputIdAtIndex = `firstTextValue${row}-option`;
  const firstInputValueAtIndex = useGetInputValueAtIndex("firstTextValue", row);
  const [, setSelectedItemIndex] = useAtom(selectedItemIndexAtom);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLInputElement
    ) {
      const newValue = event.target.value;
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handleInputFocus = () => {
    if (setIsSelectOpen) {
      setIsSelectOpen();
    }
  };

  const handleInputBlur = () => {
    setSelectedItemIndex(null);
  };

  return (
    <Container checked={checked} isInProjectHeader>
      <Input
        {...rest}
        onBlur={handleInputBlur}
        autoComplete="off"
        hasValue={isValueInFirstInput}
        placeholder={"Cargo"}
        type="text"
        id={firstInputIdAtIndex}
        value={firstInputValueAtIndex || ""}
        onChange={handleChange}
        onClick={handleInputFocus}
        className={poppins.className}
        readOnly={true}
        isLastRow={isLastRow}
      />
    </Container>
  );
}
