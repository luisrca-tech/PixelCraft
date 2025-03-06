import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Overlay,
  Content,
  CloseButton,
  Title,
  MonthsContainer,
  InputContainer,
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
import { api } from "~/trpc/react";
import { useAbsences } from "~/utils/functions/useAbsences";

interface AbsenceModalProps {
  task: TaskInfo;
  onClose: () => void;
}

const AbsenceModal = ({ task, onClose }: AbsenceModalProps) => {
  const { register, handleSubmit, reset } = useForm<AbsencesData>({
    resolver: zodResolver(absenceSchema),
  });

  useAbsences(task, reset);

  const peopleName = task.fieldName || "(sem nome)";

  const upsertAbsences = api.absences.upsertAbsences.useMutation();

  const onSubmit = async (data: AbsencesData) => {
    try {
      const formattedData = data.absencesForTask.map((absence) => ({
        taskId: task.taskId,
        month: absence.month,
        absences: Number(absence.absences || 0),
      }));

      await upsertAbsences.mutateAsync({
        absencesForTask: formattedData,
      });

      showToast("success", `Ausências de ${peopleName} registradas`);
      onClose();
      window.location.reload();
    } catch (error) {
      showToast("error", "Erro ao registrar ausências");
      console.error(error);
    }
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
                <InputContainer>
                  <Input
                    type="text"
                    placeholder="Horas"
                    onKeyDown={allowOnlyNumbers}
                    {...register(`absencesForTask.${index}.absences`)}
                  />
                  <span>Horas</span>
                </InputContainer>
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
