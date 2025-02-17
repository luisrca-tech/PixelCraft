import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Overlay,
  Content,
  CloseButton,
  Title,
  MonthsContainer,
} from "./styles";
import Input from "~/components/inputs/Input";
import { type TaskInfo } from "~/server/types/Clickup.type";
import Button from "../Button";
import Close from "../../../../public/close.svg";
import Image from "next/image";
import { getMonthName } from "~/utils/functions/monthUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { absenceSchema } from "~/schemas/absences-per-month-schema";
import { type AbsencesData } from "~/types/absenses-input-type";
import { allowOnlyNumbers } from "~/utils/functions/allowOnlyNumbers";
import { showToast } from "~/utils/functions/showToast";

interface AbsenceModalProps {
  task: TaskInfo;
  onClose: () => void;
}

const AbsenceModal = ({ task, onClose }: AbsenceModalProps) => {
  const peopleName = task.fieldName || "(sem nome)";
  const { register, handleSubmit } = useForm<AbsencesData>({
    resolver: zodResolver(absenceSchema),
    defaultValues: {
      absencesForTask: task.months.map((month) => ({
        taskId: task.taskId,
        month: month,
        absences: "0",
      })),
    },
  });

  const onSubmit = async (data: AbsencesData) => {
    const formattedData = data.absencesForTask.map((absence) => ({
      taskId: task.taskId,
      month: absence.month,
      absences: absence.absences === "" ? "0" : absence.absences,
    }));

    console.log(JSON.stringify(formattedData, null, 2));

    showToast("success", `Ausências de ${peopleName} registradas`);
    return onClose();
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Overlay />
      <Content>
        <Title> Ausências de {peopleName}</Title>
        <CloseButton onClick={onClose}>
          <Image src={Close} alt="close-modal-icon" width={20} height={20} />
        </CloseButton>

        <form onSubmit={handleSubmit(onSubmit)}>
          <MonthsContainer>
            {task.months.map((month, index) => (
              <div key={month}>
                <label>{getMonthName(month)}</label>
                <Input
                  type="text"
                  placeholder="Dias de ausência"
                  onKeyDown={allowOnlyNumbers}
                  {...register(`absencesForTask.${index}.absences`)}
                />
              </div>
            ))}
          </MonthsContainer>
          <Button type="submit" text="Salvar" />
        </form>
      </Content>
    </Dialog.Root>
  );
};

export default AbsenceModal;
