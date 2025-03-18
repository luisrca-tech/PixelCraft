import { useAtom } from "jotai";
import { Container } from "./styles";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { type OptionType } from "~/server/types/Clickup.type";
import Image from "next/image";
import AddButton from "public/add.svg";
import { poppins } from "~/app/fonts";
import { useToggleSelectOpen } from "~/utils/functions/toggleSelectedOpen";
import { selectedItemIndexAtom } from "~/@atom/ProjectStates/selectedItemIndexAtom";

type ScrollDownOptionButtonType = {
  row: string;
  value: OptionType;
  index: number;
};

export default function ScrollDownOptionButton({
  row,
  value,
  index,
}: ScrollDownOptionButtonType) {
  const currentRow = row ? row : "projectRow";
  const isProjectRow = row === "projectRow";
  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [, setSelectedItemIndex] = useAtom(selectedItemIndexAtom);
  function handleClick() {
    if (isProjectRow) {
      setProjectSelectedValue((prevState) => ({
        ...prevState,
        selectedValue: {
          ...prevState.selectedValue,
          [`${currentRow}-text`]: value.label || "",
          [`${currentRow}-option`]: value.id,
        },
      }));
    } else {
      setRowsAndSelectedValues((prevState) => ({
        ...prevState,
        selectedValues: {
          ...prevState.selectedValues,
          [`firstTextValue${currentRow}-text`]: value.name || "",
          [`firstTextValue${currentRow}-option`]: `${index}`,
        },
      }));
    }
    setSelectedItemIndex(null);
  }

  return (
    <Container
      type="button"
      onMouseDown={() => {
        handleClick();
      }}
    >
      <Image src={AddButton} alt="" />
      {isProjectRow ? (
        <span className={poppins.className}>{value.label}</span>
      ) : (
        <span className={poppins.className}>{value.name}</span>
      )}
    </Container>
  );
}
