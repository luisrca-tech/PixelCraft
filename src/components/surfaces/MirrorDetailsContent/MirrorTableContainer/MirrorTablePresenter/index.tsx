import { useAtom } from "jotai";
import { Container } from "../styles";

import { Row } from "~/components/surfaces/Row";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { poppins } from "~/app/fonts";
import { type TasksInfosType } from "~/server/types/Clickup.type";

type TableDataProps = {
  tasksCustomFields?: TasksInfosType;
};
export function TableData({ tasksCustomFields }: TableDataProps) {
  const [checked] = useAtom(checkedAtom);
  return (
    <Container className={poppins.className}>
      {tasksCustomFields?.map((taskCustomFields) => (
        <Row.Root key={taskCustomFields.taskId}>
          <Row.Span
            taskCustomField={taskCustomFields.chargeName}
            checked={checked}
          />
          {!checked ? (
            <>
              <Row.Span taskCustomField={taskCustomFields.hours} centralized />
              <Row.Span
                taskCustomField={taskCustomFields.valueByHour}
                centralized
              />
            </>
          ) : (
            <Row.CalendarValues taskCustomFields={taskCustomFields} />
          )}
        </Row.Root>
      ))}
    </Container>
  );
}
