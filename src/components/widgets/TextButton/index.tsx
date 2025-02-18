import { ButtonContainer } from "./styles";
import { poppins } from "~/app/fonts";

interface TextButtonProps {
  text: string;
  action?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export const TextButton = ({
  text,
  action,
  icon,
  disabled = false,
  loading = false,
}: TextButtonProps) => {
  return (
    <ButtonContainer
      onClick={action}
      type="button"
      disabled={disabled || loading}
      style={{ opacity: loading ? 0.7 : 1 }}
    >
      {loading ? (
        "Salvando..."
      ) : (
        <>
          {text && <span className={poppins.className}>{text}</span>}
          {icon}
        </>
      )}
    </ButtonContainer>
  );
};
