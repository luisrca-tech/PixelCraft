import { poppins } from "~/app/fonts";
import { Container } from "./styles";
import classnames from "classnames";
import LoadingIndicator from "~/components/widgets/LoadingIndicator";

type ButtonRegistrationType = {
  text: string;
  loading?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  loading,
  disabled,
  ...rest
}: ButtonRegistrationType) {
  const pLoading = typeof loading !== "boolean" ? false : loading;

  return (
    <Container disabled={disabled}>
      <button
        type="button"
        {...rest}
        className={classnames({
          loading: pLoading,
          [rest.className as string]: true,
        })}
      >
        {!!loading ? (
          <LoadingIndicator />
        ) : (
          <span className={poppins.className}>{text} </span>
        )}
      </button>
    </Container>
  );
}
