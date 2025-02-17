import { BudgetContent, Container, ProjectDuration } from "./styles";
import { poppins } from "~/app/fonts";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useAtom } from "jotai";

type BudgetProps = {
  budgetInfo?: {
    totalHours: number;
    totalDays: number;
    totalValue: string | number;
  };
};
export function Budget({ budgetInfo }: BudgetProps) {
  const [checked] = useAtom(checkedAtom);

  return (
    <Container>
      {checked ? (
        <>
          <ProjectDuration className={poppins.className}>
            <span>Duração do projeto:</span>
            <span>{Math.ceil(budgetInfo?.totalDays || 0)} Dias</span>
          </ProjectDuration>
        </>
      ) : (
        <>
          <BudgetContent className={poppins.className}>
            <span>Total:</span>
          </BudgetContent>
          <BudgetContent>
            <span>{`${budgetInfo?.totalHours}h`}</span>
          </BudgetContent>
          <BudgetContent>
            <span>{`R$${budgetInfo?.totalValue}`}</span>
          </BudgetContent>
        </>
      )}
    </Container>
  );
}
