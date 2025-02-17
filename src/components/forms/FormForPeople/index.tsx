"use client";

import { useSession } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import Button from "~/components/widgets/Button";
import { Skeleton } from "~/components/widgets/Skeleton";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { formPersonsSchema } from "~/schemas/form-persons.schema";
import { api } from "~/trpc/react";
import { type formPersonsData } from "~/types/form-persons.type";
import { showToast } from "~/utils/functions/showToast";
import { FormFooter } from "../../surfaces/FormFooter";
import { Container, Form, PersonByRole, RoleAndPerson } from "./styles";
import { useSearchParams } from "next/navigation";
import { allocatedPeopleAtom } from "~/@atom/ProjectStates/allocatedPeopleAtom";
import { useState } from "react";
import AbsenceModal from "~/components/widgets/AbsenceModal";
import { type TaskInfo } from "~/server/types/Clickup.type";

export function FormForPeople() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { session } = useSession();
  const userId = session?.user.id;
  const { getTasksInfos } = useTasksOfProject();
  const roles = getTasksInfos();
  const updateTaskName = api.clickup.updateTaskName.useMutation();
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const [, setPeopleState] = useAtom(allocatedPeopleAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formPersonsData>({
    resolver: zodResolver(formPersonsSchema),
  });

  const [selectedTask, setSelectedTask] = useState<TaskInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async ({ names }: formPersonsData) => {
    setIsLoading(true);
    try {
      await updateTaskName.mutateAsync({
        userId: userId ?? "",
        taskIds: roles?.map((role) => role.taskId),
        names: names,
      });

      showToast("success", "Pessoas alocadas com sucesso!");
      window.location.href = `/espelho?projectId=${projectId}`;
    } catch (error) {
      showToast("error", "Failed to update task name");
    } finally {
      setIsLoading(false);
    }
  };

  const onInputChange = (index: number, value: string) => {
    setPeopleState((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleOpenModal = (role: TaskInfo) => {
    const taskInfo: TaskInfo = {
      taskId: role.taskId,
      chargeName: role.chargeName,
      fieldName: role.fieldName,
      hours: role.hours || 0,
      valueByHour: role.valueByHour || 0,
      taskStartDate: role.taskStartDate || new Date(),
      taskDueDate: role.taskDueDate || new Date(),
      chargeOptions: role.chargeOptions,
      chargeValue: role.chargeValue,
      months: role.months,
      absencesValue: role.absencesValue,
    };

    setSelectedTask(taskInfo);
    setIsModalOpen(true);
  };

  return (
    <Container>
      <RoleAndPerson>
        <span>Pessoa</span>
        <span>Cargo</span>
        <span>Ausências</span>
      </RoleAndPerson>
      {roles ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {roles?.map((role, index) => (
            <div key={index}>
              <PersonByRole>
                <input
                  type="text"
                  defaultValue={role.fieldName}
                  placeholder="Nome"
                  {...register(`names.${index}`)}
                  onChange={(e) => onInputChange(index, e.target.value)}
                />
                <span>{role.chargeName}</span>
                <Button
                  type="button"
                  onClick={() => handleOpenModal(role)}
                  text="Ausências"
                />
              </PersonByRole>
              {errors.names && errors.names[index] && (
                <p>{errors.names[index]?.message}</p>
              )}
            </div>
          ))}
          <FormFooter>
            {!isLoading && <Button text="Salvar" type="submit" />}
          </FormFooter>
        </Form>
      ) : (
        <Form>
          {Array.from({ length: 5 }).map((_, index) => (
            <PersonByRole key={index}>
              <Skeleton key={index} width="100%" height="1rem" />
            </PersonByRole>
          ))}
          <FormFooter>
            {!isLoading && <Button text="Salvar" type="submit" />}
          </FormFooter>
        </Form>
      )}
      {isModalOpen && selectedTask && (
        <AbsenceModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Container>
  );
}
