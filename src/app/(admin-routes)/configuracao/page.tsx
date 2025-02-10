"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";

import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { configurationSchema } from "~/schemas/configuration-schema";
import { api } from "~/trpc/react";
import { type configurationType } from "~/types/configuration.type";
import { showToast } from "~/utils/functions/showToast";
import { Container, Form } from "./styles";
import { Skeleton } from "~/components/widgets/Skeleton";

export default function Configuration() {
  const { session } = useSession();
  const userId = session?.user.id ?? "";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<configurationType>({
    resolver: zodResolver(configurationSchema),
    mode: "onChange",
  });

  const upsertClickUpKeys = api.clickup.upsertKeys.useMutation();
  const getClickUpKeys = api.clickup.getClickupKeys.useQuery({ userId });
  const submitIsDisabled = !!errors.listId?.message || !!errors.pk?.message;

  const onSubmit = async ({ pk, listId }: configurationType) => {
    try {
      await upsertClickUpKeys.mutateAsync({
        pk,
        listId,
        userId: userId,
      });
      if (upsertClickUpKeys.isSuccess) {
        showToast("success", "Configuração salva com sucesso!");
      }
      router.push("/projetos");
    } catch (error) {
      showToast("error", "Erro ao salvar a configuração.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {getClickUpKeys.isPending ? (
          <Skeleton width="328px" height="40px" />
        ) : (
          <Input
            id="listId"
            type="text"
            placeholder="List Id"
            defaultValue={getClickUpKeys.data?.listId ?? ""}
            {...register("listId")}
          />
        )}

        <ErrorMessage>
          {errors.listId?.message && errors.listId?.message}
        </ErrorMessage>
        {getClickUpKeys.isPending ? (
          <Skeleton width="328px" height="40px" />
        ) : (
          <Input
            id="pk"
            type="text"
            placeholder="Autorization Key"
            defaultValue={getClickUpKeys.data?.AuthorizationPkKey ?? ""}
            {...register("pk")}
          />
        )}
        <ErrorMessage>{errors.pk?.message && errors.pk?.message}</ErrorMessage>
        <Button
          className={roboto.className}
          loading={isSubmitting}
          text="Salvar"
          type="submit"
          disabled={submitIsDisabled || getClickUpKeys.isPending}
        />
      </Form>
    </Container>
  );
}
