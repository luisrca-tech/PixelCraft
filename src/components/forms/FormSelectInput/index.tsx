import { useAtom } from "jotai";
import { useEffect, type FormEvent } from "react";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import {
  rangesAtom,
  type SelectableRangePropsType,
} from "~/@atom/ProjectStates/rangesAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useProcessRows } from "~/hooks/useProcessRows";
import { showToast } from "~/utils/functions/showToast";
import Button from "../../widgets/Button";
import { Budget } from "../../widgets/Budget";
import { FormHeader } from "~/components/surfaces/FormHeader";
import InputsDataContainer from "./InputsDataContainer";
import { Container } from "./styles";
import { FormFooter } from "../../surfaces/FormFooter";
import ToggleSwitch from "~/components/widgets/ToggleSwitch";
import { useTotalDaysCalc } from "~/utils/functions/useTotalDaysCalc";
import { useTotalHoursSum } from "~/utils/functions/useTotalHoursSum";

type FormSelectInputProps = {
  onReset: () => void;
};

export default function FormSelectInput({ onReset }: FormSelectInputProps) {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [ranges] = useAtom(rangesAtom);
  const rangesCondition = validateRanges(ranges);
  const { processRows } = useProcessRows();
  const totalDays = useTotalDaysCalc();
  const { totalHours, totalValue } = useTotalHoursSum();
  const budgetInfo = { totalDays, totalHours, totalValue };

  const selectedValuesNotEmpty2 = Object.values(
    projectSelectedValue.selectedValue
  ).some((value) => value !== "");

  const selectedValuesNotEmpty1 = Object.values(
    rowsAndSelectedValues.selectedValues
  ).every((value) => value !== "");

  const cantSubmit =
    !rangesCondition ||
    !selectedValuesNotEmpty1 ||
    !selectedValuesNotEmpty2 ||
    projectSelectedValue.selectedValue["projectRow-option"] === "";

  function validateRanges(ranges: {
    [key: string]: SelectableRangePropsType;
  }): boolean {
    const keys = Object.keys(ranges);

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i] as string;
      if (!ranges[key]?.startDate || !ranges[key]?.endDate) {
        return false;
      }
    }

    return true;
  }

  async function taskPostRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const { toastMessage, projectFieldSelectedValue } = await processRows();
      showToast("success", `${toastMessage}`);
      onReset();
      window.location.href = `/espelho?projectId=${projectFieldSelectedValue}`;
    } catch (error) {
      showToast(
        "error",
        "Não foi possível concluir a criação das Tasks",
        "Algum erro inesperado ocorreu, contate nossa equipe"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container onSubmit={taskPostRequest}>
      <ToggleSwitch />
      <FormHeader />
      <InputsDataContainer />
      <FormFooter>
        <Budget budgetInfo={budgetInfo} />
        <Button
          text="Salvar"
          disabled={cantSubmit}
          loading={loading}
          type="submit"
        />
      </FormFooter>
    </Container>
  );
}
