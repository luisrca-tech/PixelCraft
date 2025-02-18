import { ButtonContainer } from "./styles";
import { poppins } from "~/app/fonts";

type TextButtonProps = {
  text?: string;
  action?: () => void;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const TextButton = ({
  text,
  action,
  icon,
  ...rest
}: TextButtonProps) => {
  return (
    <ButtonContainer onClick={action} type="button" {...rest}>
      {text && <span className={poppins.className}>{text}</span>}
      {icon}
    </ButtonContainer>
  );
};
