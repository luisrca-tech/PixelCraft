import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import {
  rangesAtom,
  type SelectableRangePropsType,
} from "~/@atom/ProjectStates/rangesAtom";
import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { api } from "~/trpc/react";
import { useSession } from "@clerk/nextjs";

export interface ChargeFieldSelectedValue {
  chargeValueNumber: number;
  hoursPerMonthValueNumber: number;
  hourPerValueNumber: number;
  reqMethod: string | undefined;
  taskId: string | undefined;
}

export function useProcessRows() {
  const { session } = useSession();
  const userId = session?.user.id;
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [ranges] = useAtom(rangesAtom);
  const rows = rowsAndSelectedValues.rows;
  const [fieldsIds] = useAtom(fieldsIdsAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const projectFieldSelectedValue =
    projectSelectedValue.selectedValue["projectRow-option"];

  const mutationUpdateTask = api.clickup.updateTask.useMutation();
  const mutationPostTask = api.clickup.postTask.useMutation();
  const mutationChargeCustomField =
    api.clickup.postChargeCustomField.useMutation();
  const mutationProjectCustomField =
    api.clickup.postProjectCustomField.useMutation();
  const mutationHourPMonthCustomField =
    api.clickup.postHourPMonthCustomField.useMutation();
  const mutationValueCustomField =
    api.clickup.postValueCustomField.useMutation();

  function getOptionValueForRow(
    row: string,
    selectedValues: { [key: string]: string }
  ): ChargeFieldSelectedValue {
    const firstValue = `firstTextValue${row}-option`;
    const secondValue = `secondTextValue${row}-text`;
    const thirdValue = `thirdTextValue${row}-text`;
    const reqMethod = selectedValues[`reqMethod${row}`];
    const taskId = selectedValues[`taskId${row}`];

    const chargeValueNumber = Number(selectedValues[firstValue]);
    const hoursPerMonthValueNumber = Number(selectedValues[secondValue]);
    const hourPerValueNumber = Number(selectedValues[thirdValue]);

    return {
      chargeValueNumber,
      hoursPerMonthValueNumber,
      hourPerValueNumber,
      reqMethod,
      taskId,
    };
  }

  function getOptionDateForRow({
    row,
    ranges,
  }: {
    row: string;
    ranges: { [key: string]: SelectableRangePropsType };
  }) {
    const valueDateRow = ranges[row];
    return valueDateRow;
  }

  async function processRows() {
    let toastMessage;

    const tasksIdsPromises = [];
    for (let i = 0; i < rows.length - 1; i++) {
      const row = rows[i] as string;
      const FieldSelectedValue = getOptionValueForRow(
        row,
        rowsAndSelectedValues.selectedValues
      );

      const reqMethod = FieldSelectedValue.reqMethod;

      const FieldDateSelectedValue = getOptionDateForRow({ row, ranges });
      const startDate = FieldDateSelectedValue?.startDate;
      const endDate = FieldDateSelectedValue?.endDate;
      if (FieldDateSelectedValue) {
        let taskId;

        if (reqMethod === "PUT") {
          taskId = FieldSelectedValue.taskId;

          tasksIdsPromises.push(
            mutationUpdateTask.mutateAsync({
              userId: userId ?? "",

              Dates: { startDate, endDate },
              taskId: taskId,
            })
          );
          toastMessage = "Projeto atualizado";
        } else {
          tasksIdsPromises.push(
            mutationPostTask.mutateAsync({
              userId: userId ?? "",
              row: row,
              Dates: { startDate, endDate },
            })
          );
          toastMessage = "Projeto criado";
        }
      }
    }

    const resultTasksId = await Promise.all(tasksIdsPromises);
    const projectFieldId = fieldsIds.projectFieldId;
    for (let i = 0; i < resultTasksId.length; i++) {
      const taskId = resultTasksId[i]?.taskId;
      const row = rows[i] as string;
      const FieldSelectedValue = getOptionValueForRow(
        row,
        rowsAndSelectedValues.selectedValues
      );
      const chargeFieldSelectedValue = FieldSelectedValue.chargeValueNumber;
      const valueFieldSelectedValue = FieldSelectedValue.hourPerValueNumber;
      const hoursPMonthFieldSelectedValue =
        FieldSelectedValue.hoursPerMonthValueNumber;

      if (taskId && fieldsIds) {
        const customFieldsPromises = [];

        customFieldsPromises.push(
          mutationChargeCustomField.mutateAsync({
            postTaskId: taskId,
            chargeFieldId: fieldsIds.chargeFieldId,
            chargeFieldSelectedValue: chargeFieldSelectedValue,
            userId: userId ?? "",
          })
        );
        customFieldsPromises.push(
          mutationProjectCustomField.mutateAsync({
            postTaskId: taskId,
            projectFieldId: projectFieldId,
            projectFieldSelectedValue: projectFieldSelectedValue,
            userId: userId ?? "",
          })
        );

        customFieldsPromises.push(
          mutationValueCustomField.mutateAsync({
            postTaskId: taskId,
            valueFieldId: fieldsIds.valueFieldId,
            valueFieldSelectedValue: valueFieldSelectedValue,
            userId: userId ?? "",
          })
        );

        customFieldsPromises.push(
          mutationHourPMonthCustomField.mutateAsync({
            postTaskId: taskId,
            hoursPerMonthCustomFieldId: fieldsIds.hoursPerMonthCustomFieldId,
            hoursPMonthFieldSelectedValue: hoursPMonthFieldSelectedValue,
            userId: userId ?? "",
          })
        );
        await Promise.all(customFieldsPromises);
      }
    }

    return { toastMessage, projectFieldSelectedValue };
  }

  return {
    processRows,
  };
}
