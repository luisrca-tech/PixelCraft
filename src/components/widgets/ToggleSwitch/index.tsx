import { Container, SwitchContainer } from "./styles";
import * as Switch from "@radix-ui/react-switch";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useAtom } from "jotai";
import { selectedItemIndexAtom } from "~/@atom/ProjectStates/selectedItemIndexAtom";

export default function ToogleSwitch() {
  const [checked, setChecked] = useAtom(checkedAtom);
  const [selectedItemIndex] = useAtom(selectedItemIndexAtom);
  const handleCheckedChange = () => {
    setChecked(!checked);
  };
  const isProjectRowSelected = selectedItemIndex === "projectRow";
  return (
    <SwitchContainer isProjectRowSelected={isProjectRowSelected}>
      <span>Editar datas</span>
      <Container>
        <Switch.Root
          className="SwitchRoot"
          id="airplane-mode"
          onCheckedChange={handleCheckedChange}
          checked={checked}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </Container>
    </SwitchContainer>
  );
}
