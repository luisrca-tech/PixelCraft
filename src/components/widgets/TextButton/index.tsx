import { ButtonContainer } from "./styles";
import { poppins } from "~/app/fonts";

type TextButtonProps = {
  text?: string;
  action?: () => void;
  icon?: React.ReactNode;
};

export const TextButton = ({ text, action, icon }: TextButtonProps) => {
  return (
    <ButtonContainer onClick={action} type="button">
      {text && <span className={poppins.className}>{text}</span>}
      {icon}
    </ButtonContainer>
  );
};
