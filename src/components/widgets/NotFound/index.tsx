import Button from "../Button";
import { Container } from "./style";

interface NotFoundProps {
  message: string;
  description?: string;
  buttonAction?: () => void;
  buttonText?: string;
}

export function NotFound({
  message,
  description,
  buttonAction,
  buttonText,
}: NotFoundProps) {
  return (
    <Container>
      <div />
      <div>
        <p>{message}</p>
        {description && <p>{description}</p>}
        {buttonAction && (
          <Button
            text={buttonText ?? "Voltar"}
            onClick={buttonAction}
          />
        )}
      </div>
    </Container>
  );
}
